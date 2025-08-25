import styles from './AboutFeatures.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

const features = [
  { title: 'Deep Clean', desc: 'Professional cleaning for all materials.' },
  { title: 'Restoration', desc: 'Color touch-ups and midsole whitening.' },
  { title: 'Protection', desc: 'Water and stain repellent coating.' },
]

export default function AboutFeatures() {
  // Build list of gallery images from public folder - Sole X logo first, then all 14 images
  const IMAGES = useMemo(() => [
    '/solex-logo.png', // Sole X logo first
    '/shoe-cleaning-images/cleaning-1.jpg',
    '/shoe-cleaning-images/cleaning-2.jpg',
    '/shoe-cleaning-images/cleaning-3.jpg',
    '/shoe-cleaning-images/cleaning-4.jpg',
    '/shoe-cleaning-images/cleaning-5.jpg',
    '/shoe-cleaning-images/cleaning-6.jpg',
    '/shoe-cleaning-images/cleaning-7.jpg',
    '/shoe-cleaning-images/cleaning-8.jpg',
    '/shoe-cleaning-images/cleaning-9.jpg',
    '/shoe-cleaning-images/cleaning-10.jpg',
    '/shoe-cleaning-images/cleaning-11.jpg',
    '/shoe-cleaning-images/cleaning-12.jpg',
    '/shoe-cleaning-images/cleaning-13.jpg',
    '/shoe-cleaning-images/cleaning-14.jpg'
  ], [])

  // Preload images once for smooth transitions
  useEffect(() => {
    IMAGES.forEach((src) => { const img = new Image(); img.src = src })
  }, [IMAGES])

  // Simple slideshow state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)
  const stageRef = useRef(null)
  const touchStartXRef = useRef(0)
  const touchDeltaXRef = useRef(0)
  // Track when we've moved past the initial logo and what shoe index to show next
  const startedRef = useRef(false) // becomes true after leaving the logo the first time (autoplay or manual)
  const shoeAutoIndexRef = useRef(0) // index within the shoes list (IMAGES[1..]) for next autoplay

  const goToImage = (idx) => {
    if (isTransitioning) return
    
    const len = IMAGES.length
    if (len === 0) return
    
    const nextIdx = ((idx % len) + len) % len
    setIsTransitioning(true)
    
    // After transition completes, update current
    setTimeout(() => {
      setCurrentIndex((prev) => {
        // Update book-keeping when navigating directly
        if (nextIdx === 0) {
          // Stay started if already started; otherwise this is still the intro logo
          return 0
        }
        startedRef.current = true
        // Keep autoplay aligned with the selected shoe
        shoeAutoIndexRef.current = nextIdx - 1 // map back to 0-based within shoes
        return nextIdx
      })
      setIsTransitioning(false)
      restartTimer()
    }, 300) // Match CSS transition duration
  }

  const nextImage = () => {
    if (isTransitioning) return
    const len = IMAGES.length
    if (!len) return
    
    // If we're on the intro logo and haven't started yet, go to first shoe
    if (!startedRef.current && currentIndex === 0) {
      startedRef.current = true
      shoeAutoIndexRef.current = 0
      goToImage(1)
      return
    }
    // Otherwise, advance within shoes (1..len-1)
    const nextPos = ((currentIndex - 1 + 1) % (len - 1)) // 0..len-2
    shoeAutoIndexRef.current = nextPos
    goToImage(1 + nextPos)
  }

  const prevImage = () => {
    if (isTransitioning) return
    const len = IMAGES.length
    if (!len) return
    
    // If we're on the intro logo and haven't started yet, jump to last shoe
    if (!startedRef.current && currentIndex === 0) {
      startedRef.current = true
      shoeAutoIndexRef.current = (len - 2)
      goToImage(len - 1)
      return
    }
    // Otherwise, go back within shoes (1..len-1)
    const prevPos = ((currentIndex - 1 - 1 + (len - 1)) % (len - 1)) // 0..len-2
    shoeAutoIndexRef.current = prevPos
    goToImage(1 + prevPos)
  }

  const restartTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(tick, 5000)
  }

  const tick = () => {
    if (document.hidden) { timerRef.current = setTimeout(tick, 1000); return }
    const len = IMAGES.length
    if (!len) { timerRef.current = setTimeout(tick, 5000); return }

    // Advance using functional update to avoid stale state and skip logo after first display
    setCurrentIndex((prev) => {
      if (!startedRef.current) {
        // Move off the logo to the first shoe
        startedRef.current = true
        shoeAutoIndexRef.current = 0
        return 1
      }
      // Cycle within shoes 1..len-1
      const nextPos = (shoeAutoIndexRef.current + 1) % (len - 1) // 0..len-2
      shoeAutoIndexRef.current = nextPos
      return 1 + nextPos
    })
    timerRef.current = setTimeout(tick, 5000)
  }

  useEffect(() => {
    // Start timer with first image (Sole X logo), then move to shoes only
    startedRef.current = false
    shoeAutoIndexRef.current = 0
    setCurrentIndex(0)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(tick, 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IMAGES])

  // Keyboard navigation for accessibility
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [isTransitioning])

  // Touch swipe support
  const onTouchStart = (e) => {
    if (isTransitioning) return
    const t = e.touches && e.touches[0]
    if (!t) return
    touchStartXRef.current = t.clientX
    touchDeltaXRef.current = 0
  }
  const onTouchMove = (e) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    touchDeltaXRef.current = t.clientX - touchStartXRef.current
  }
  const onTouchEnd = () => {
    if (isTransitioning) return
    const dx = touchDeltaXRef.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextImage(); else prevImage()
    }
    touchStartXRef.current = 0
    touchDeltaXRef.current = 0
  }

  return (
    <section className={styles.af} id="about">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.aboutGrid}>
            <div className={styles.content}>
              <h2 className={styles.heading}><span className={styles.kicker}>Crafted Care</span> About Sole X</h2>
              <p className={styles.lead}>
                We're a sneaker care studio dedicated to bringing your pairs back to life.
                From everyday cleans to full restorations, we treat each shoe with the same
                attention to detail—so they look fresh, feel great, and last longer.
              </p>
              <p className={styles.body}>
                Our process uses material-safe solutions and a careful, hand-finished approach.
                Whether it's a quick refresh, a deep clean inside and out, or a targeted sole whitening,
                we tailor our work to the materials and construction of your sneakers.
              </p>
              <ul className={styles.points}>
                <li>
                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                    </svg>
                  </span>
                  <span>General Cleaning — everyday refresh for your rotation</span>
                </li>
                <li>
                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                    </svg>
                  </span>
                  <span>Sole Whitening — removes yellowing, restores brightness</span>
                </li>
                <li>
                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.1 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z"/>
                    </svg>
                  </span>
                  <span>Deep Cleaning — full inside-out treatment for stubborn dirt and odors</span>
                </li>
              </ul>
              <p className={styles.note}>
                Transparent pricing, careful handling, and quick turnaround.
                Send us a message to get started or browse our services to learn more.
              </p>
            </div>
            <div className={styles.media}>
              <div className={styles.rotator} aria-label="Shoe cleaning showcase">
                <div
                  className={styles.stage}
                  ref={stageRef}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Shoe cleaning showcase"
                  tabIndex={0}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <button type="button" className={`${styles.arrow} ${styles.left}`} aria-label="Previous image" onClick={prevImage} disabled={isTransitioning}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                  </button>
                  <button type="button" className={`${styles.arrow} ${styles.right}`} aria-label="Next image" onClick={nextImage} disabled={isTransitioning}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z"/></svg>
                  </button>
                  
                  {/* Simple slideshow with crossfade */}
                  <div className={styles.slideContainer}>
                    <div 
                      className={`${styles.slide} ${styles.active}`}
                      style={{ backgroundImage: `url(${IMAGES[currentIndex]})` }}
                    />
                    <div className={styles.overlay} aria-hidden="true" />
                  </div>
                </div>
                
                <div className={styles.dots} role="tablist" aria-label="Image selection">
      {IMAGES.map((_, i) => {
                    const isActive = currentIndex === i
                    return (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Show image ${i + 1}`}
                        className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
        onClick={() => !isTransitioning && goToImage(i)}
                        type="button"
                        disabled={isTransitioning}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.featuresRow}>
            {features.map((f) => (
              <Link to="/services" key={f.title} className={styles.card}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className={styles.more}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
