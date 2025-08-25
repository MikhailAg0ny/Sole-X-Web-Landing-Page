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
          <h2 className={styles.headline}>Bring Your Kicks Back to Life.</h2>
          <p className={styles.subtitle}>Professional Sneaker Cleaning & Restoration</p>
          <div className={styles.actions}>
            <Link className={styles.ctaPrimary} to="/contact">Contact Us Now</Link>
            <Link className={styles.ctaSecondary} to="/services">View Services</Link>
          </div>
        </div>
        <div className={styles.colModel}>
          <ModelCanvas
            modelUrl="/models/nike_air_zoom_pegasus_36.optim.glb"
            rotation={[0, Math.PI * 5, 0]}
            rearView={true}
            scale={3}
            offset={[0.05, -0.35, -0.48]}
            targetY={0.6}
          />
        </div>
      </div>
    </section>
  )
}
