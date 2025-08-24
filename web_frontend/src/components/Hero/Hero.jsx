import styles from './Hero.module.css'
import SoleXLogo from '../SoleXLogo'
import ModelCanvas from '../Three/ModelCanvas'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.colText}>
          <h1 className={styles.title}><SoleXLogo /></h1>
          <p className={styles.subtitle}>Premium Shoe Cleaning & Restoration</p>
          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href="#book">Book a Service</a>
            <a className={styles.ctaSecondary} href="#services">View Services</a>
          </div>
        </div>
        <div className={styles.colModel}>
          <ModelCanvas modelUrl="/models/nike_air_zoom_pegasus_36.optim.glb" rearView={true} scale={1.6} />
        </div>
      </div>
    </section>
  )
}
