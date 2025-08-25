import styles from './Hero.module.css'
import SoleXLogo from '../SoleXLogo'
import ModelCanvas from '../Three/ModelCanvas'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.colText}>
          <h1 className={styles.title}><SoleXLogo /></h1>
          <p className={styles.subtitle}>Professional Sneaker Cleaning & Restoration</p>
          <div className={styles.separator} aria-hidden="true" />
          <div className={styles.actions}>
            <Link className={styles.ctaPrimary} to="/contact">Book a Service</Link>
            <Link className={styles.ctaSecondary} to="/services">View Services</Link>
          </div>
        </div>
        <div className={styles.colModel}>
          <ModelCanvas
            modelUrl="/models/nike_air_zoom_pegasus_36.optim.glb"
            rotation={[0, Math.PI * 0.5, 0]}
            rearView={true}
            scale={2}
          />
        </div>
      </div>
    </section>
  )
}
