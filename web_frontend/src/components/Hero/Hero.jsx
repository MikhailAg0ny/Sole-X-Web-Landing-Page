import styles from './Hero.module.css'
import SoleXLogo from '../SoleXLogo'
import ModelCanvas from '../Three/ModelCanvas'
import { Link, useLocation } from 'react-router-dom'

export default function Hero() {
  const location = useLocation()
  
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
            key={`${location.pathname}-hero-model`}
            modelUrl="/models/nike_air_zoom_pegasus_36.optim.glb"
            rotation={[0, Math.PI * 5, 0]}
            rearView={true}
            scale={1.8}
            offset={[0.05, -0.25, -0.3]}
            targetY={0.5}
          />
        </div>
      </div>
    </section>
  )
}
