import styles from './Features.module.css'

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
          <article className={styles.card} key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
