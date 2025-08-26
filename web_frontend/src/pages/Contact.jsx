import { useCallback, useEffect } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('reveal-in') })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name') || ''
    const email = form.get('email') || ''
    const reason = form.get('reason') || 'General Inquiry'
    const message = form.get('message') || ''

    const to = 'hello@solex.example' // TODO: replace with your real inbox
    const subject = `Contact from ${name} — ${reason}`
    const body =
      `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}\n\n` +
      `Sent from Sole‑X website`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [])

  return (
    <section className={styles.container}>
      <header className={styles.header} data-reveal>
        <h1>Contact Us</h1>
        <p className={styles.sub}>
          Questions about cleaning, whitening, or pricing? Reach out — we’re quick to respond.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} data-reveal>
          <h2>Get in touch</h2>
          <ul className={styles.list}>
            <li>
              <a href="mailto:hello@solex.example" className={styles.link}>
                <span className={styles.k}>Email:</span> hello@solex.example
              </a>
            </li>
            <li>
              <a href="tel:+639000000000" className={styles.link}>
                <span className={styles.k}>Phone:</span> +63 900 000 0000
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=Sole-X"
                className={styles.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.k}>Address:</span> 123 Sneaker St, QC, Metro Manila
              </a>
            </li>
          </ul>

          <div className={styles.socialBlock}>
            <h3>Follow us</h3>
            <div className={styles.socialRow}>
              <a
                className={styles.iconButton}
                href="https://www.facebook.com/profile.php?id=100077518822291"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.37 2 1.88 6.48 1.88 12.06c0 4.99 3.63 9.14 8.38 9.94v-7.03H7.9v-2.9h2.36V9.9c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.75-.79 8.38-4.95 8.38-9.94Z" />
                </svg>
              </a>
              <a
                className={styles.iconButton}
                href="https://www.tiktok.com/@sole.x.x"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 8.5a6.9 6.9 0 0 1-4.3-1.6v7.2c0 3.5-2.8 6.4-6.3 6.4S4 17.6 4 14.1c0-3.5 2.8-6.4 6.3-6.4.4 0 .9.04 1.3.13v2.93a3.44 3.44 0 0 0-1.3-.25c-1.9 0-3.5 1.57-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.57 3.5-3.5V2.5h2a6.9 6.9 0 0 0 5.2 2.5V8.5Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.hours}>
            <h3>Hours</h3>
            <p>Mon–Sat 10:00–19:00 • Sun 12:00–17:00</p>
            <p>Avg response time: under 2 hours</p>
          </div>

          <div className={styles.faq}>
            <h3>FAQs</h3>
            <details>
              <summary>How long does cleaning take?</summary>
              <p>General Cleaning: 24–48 hours. Deep Cleaning/Whitening: 2–3 days.</p>
            </details>
            <details>
              <summary>Do you accept walk‑ins?</summary>
              <p>Yes. Booking ahead ensures faster turnaround at peak hours.</p>
            </details>
          </div>
        </div>

        <div className={styles.card} data-reveal>
          <h2>Send us a message</h2>
          <p className={styles.sub} style={{ marginBottom: 12 }}>
            Prefer socials? Reach us directly on TikTok or Facebook — quick replies.
          </p>
          <div className={styles.socialRow}>
            <a
              className={styles.socialContact}
              href="https://www.tiktok.com/@sole.x.x"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={styles.socialIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M21 8.5a6.9 6.9 0 0 1-4.3-1.6v7.2c0 3.5-2.8 6.4-6.3 6.4S4 17.6 4 14.1c0-3.5 2.8-6.4 6.3-6.4.4 0 .9.04 1.3.13v2.93a3.44 3.44 0 0 0-1.3-.25c-1.9 0-3.5 1.57-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.57 3.5-3.5V2.5h2a6.9 6.9 0 0 0 5.2 2.5V8.5Z"/></svg>
              </span>
              <div className={styles.socialText}>
                <strong>TikTok</strong>
                <span>@sole.x.x</span>
              </div>
            </a>
            <a
              className={styles.socialContact}
              href="https://www.facebook.com/profile.php?id=100077518822291"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={styles.socialIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.37 2 1.88 6.48 1.88 12.06c0 4.99 3.63 9.14 8.38 9.94v-7.03H7.9v-2.9h2.36V9.9c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.75-.79 8.38-4.95 8.38-9.94Z"/></svg>
              </span>
              <div className={styles.socialText}>
                <strong>Facebook</strong>
                <span>Profile</span>
              </div>
            </a>
          </div>
          <p className={styles.helpText}>
            You can still email us anytime at <a className={styles.link} href="mailto:hello@solex.example">hello@solex.example</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
