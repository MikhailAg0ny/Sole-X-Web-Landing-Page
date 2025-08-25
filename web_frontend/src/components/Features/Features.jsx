import styles from './Features.module.css'
import { Link } from 'react-router-dom'

const items = [
  { title: 'Deep Clean', desc: 'Professional cleaning for all materials.' },
  { title: 'Restoration', desc: 'Color touch-ups and midsole whitening.' },
  { title: 'Protection', desc: 'Water and stain repellent coating.' },
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
