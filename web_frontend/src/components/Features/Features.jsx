import styles from './Features.module.css'
import { Link } from 'react-router-dom'

const items = [
  { title: 'General Cleaning', desc: 'Quick, material‑safe refresh for daily wear.' },
  { title: 'Sole Whitening', desc: 'Targets yellowing to restore brightness.' },
  { title: 'Deep Cleaning', desc: 'Inside‑out clean for stubborn dirt and odors.' },
]

export default function Features() {
  return (
    <section id="services" className={styles.features}>
      <div className={styles.grid}>
        {items.map((f) => (
          <Link to="/services" key={f.title} className={styles.card}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <span className={styles.more}>Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
