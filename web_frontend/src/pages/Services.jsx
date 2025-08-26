import { useEffect, useMemo, useState } from 'react'
import styles from './Services.module.css'

function BeforeAfter({ before, after, altBefore, altAfter }) {
  const [showAfter, setShowAfter] = useState(false)
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return true
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const noHover = window.matchMedia('(hover: none)').matches
    return coarse || noHover
  }, [])

  const toggle = () => setShowAfter((s) => !s)
  const keyToggle = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div
      className={`${styles.media} ${isMobile ? styles.touchable : ''} ${showAfter ? styles.showAfter : ''}`}
  onClick={isMobile ? toggle : undefined}
      role={isMobile ? 'button' : undefined}
      tabIndex={isMobile ? 0 : undefined}
      onKeyDown={isMobile ? keyToggle : undefined}
      aria-pressed={isMobile ? showAfter : undefined}
      aria-label={isMobile ? (showAfter ? 'Show before' : 'Show after') : undefined}
    >
      <img className={styles.before} src={before} alt={altBefore} loading="lazy" />
      <img className={styles.after} src={after} alt={altAfter} loading="lazy" />
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={showAfter}
        onClick={(e) => { e.stopPropagation(); toggle() }}
      >
        {showAfter ? 'After' : 'Before'}
      </button>
    </div>
  )
}

const items = [
  {
    key: 'general',
    title: 'General Cleaning',
    desc: 'Keep your daily-wear sneakers looking fresh. Our General Cleaning service removes surface dirt and grime to maintain their look.',
    prices: ['₱149', '₱215 (all-white)'],
    note: 'Inner portions not included — add ₱80 for a complete clean.',
  imgAlt: 'General Cleaning before and after',
  imgBefore: '/shoe_cleaning_before_and_after/general_cleaning_before.png',
  imgAfter: '/shoe_cleaning_before_and_after/general_cleaning_after.png',
  },
  {
    key: 'whitening',
    title: 'Sole Whitening',
    desc: 'Tired of yellowing soles making your sneakers look old? Our specialized Sole Whitening treatment restores their bright, clean look. We carefully apply our solution to all visible parts of the soles, giving your shoes a new lease on life.',
    prices: ['₱120'],
  imgAlt: 'Sole Whitening before and after',
  imgBefore: '/shoe_cleaning_before_and_after/sole_whitening_before.png',
  imgAfter: '/shoe_cleaning_before_and_after/sole_whitening_after.png',
  },
  {
    key: 'deep',
    title: 'Deep Cleaning',
    desc: 'For shoes that need serious attention, our Deep Cleaning service goes beyond the surface. We meticulously clean all portions of the sneaker — inside and out — to banish stubborn dirt, grime, and odors. This is the ultimate refresh for your favorite pair.',
    prices: ['₱299'],
  imgAlt: 'Deep Cleaning before and after',
  imgBefore: '/shoe_cleaning_before_and_after/deep_cleaning_before.png',
  imgAfter: '/shoe_cleaning_before_and_after/deep_cleaning_after.png',
  },
]

export default function Services() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('reveal-in')
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <header className={styles.header} data-reveal>
          <h1 className={styles.title}>Our Services</h1>
          <p className={styles.kicker}>PROFESSIONAL SNEAKER CARE</p>
          <p className={styles.subtitle}>
            From quick refreshes to complete restorations, we bring your kicks back to life
          </p>
        </header>

        <div className={styles.list}>
          {items.map((s, i) => (
            <article key={s.key} className={styles.item} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <BeforeAfter
                before={s.imgBefore}
                after={s.imgAfter}
                altBefore={`${s.title} — before`}
                altAfter={`${s.title} — after`}
              />
              <div className={styles.content}>
                <h2 className={styles.itemTitle}>{s.title}</h2>
                {s.prices?.length ? (
                  <div className={styles.prices}>
                    {s.prices.map((p) => (
                      <span key={p} className={styles.priceBadge}>{p}</span>
                    ))}
                  </div>
                ) : null}
                <p className={styles.desc}>{s.desc}</p>
                {s.note ? <p className={styles.note}>{s.note}</p> : null}
              </div>
            </article>
          ))}
        </div>

  {/* CTA removed per request */}
      </div>
    </section>
  )
}
