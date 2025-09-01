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
          <p className={styles.subtitle}>Quick refreshes, deep cleans, and sole whitening—tailored to your pair.</p>
          <div className={styles.actions}>
            <Link className={styles.ctaPrimary} to="/contact">Contact Us Now</Link>
            <Link className={styles.ctaSecondary} to="/services">View Services</Link>
          </div>
        </div>
        <div className={styles.colModel}>
          <div className={styles.modelPanel} aria-hidden>
            <ModelCanvas
              key={`${location.pathname}-hero-model`}
              modelUrl="/models/air_jordan_1_retro_high_bred_toe.glb"
              rotation={[0, Math.PI * 5, 0]}
              rearView={true}
              scale={0.94}
              offset={[0.02, 0, -0.18]}
              targetY={0.55}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
