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
                href="https://facebook.com/yourpage"
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
                href="https://tiktok.com/@yourhandle"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 8.5a6.9 6.9 0 0 1-4.3-1.6v7.2c0 3.5-2.8 6.4-6.3 6.4S4 17.6 4 14.1c0-3.5 2.8-6.4 6.3-6.4.4 0 .9.04 1.3.13v2.93a3.44 3.44 0 0 0-1.3-.25c-1.9 0-3.5 1.57-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.57 3.5-3.5V2.5h2a6.9 6.9 0 0 0 5.2 2.5V8.5Z" />
                </svg>
              </a>
              <a
                className={styles.iconButton}
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label>
                Name
                <input name="name" type="text" required placeholder="Juan Dela Cruz" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="you@example.com" />
              </label>
            </div>
            <label>
              Reason
              <select name="reason" defaultValue="General Inquiry">
                <option>General Inquiry</option>
                <option>Service Booking</option>
                <option>Pricing & Availability</option>
                <option>Partnership</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows="6" required placeholder="Type your message…" />
            </label>
            <div className={styles.actions}>
              <button type="submit">Send message</button>
            </div>
          </form>
          <p className={styles.helpText}>
            No account needed — your message opens in your email app.
          </p>
        </div>
      </div>
    </section>
  )
}
