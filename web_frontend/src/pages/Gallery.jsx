import styles from './Gallery.module.css'

export default function Gallery() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>Gallery</h1>
        <p className={styles.sub}>Before & After shots of shoe cleaning and restoration.</p>
      </div>
    </section>
  )
}
