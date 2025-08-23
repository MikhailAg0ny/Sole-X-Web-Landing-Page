import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sole X</h1>
        <p className={styles.subtitle}>Premium Shoe Cleaning & Restoration</p>
        <div className={styles.actions}>
          <a className={styles.ctaPrimary} href="#book">Book a Service</a>
          <a className={styles.ctaSecondary} href="#services">View Services</a>
        </div>
      </div>
    </section>
  )
}
