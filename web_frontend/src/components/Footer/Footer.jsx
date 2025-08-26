import styles from './Footer.module.css'
import { FaLaptopCode } from 'react-icons/fa'

export default function Footer({ peek = false }) {
  const onNameMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  el.style.setProperty('--mx', `${x}%`)
  el.style.setProperty('--my', `${y}%`)
  }
  const onNameLeave = (e) => {
    const el = e.currentTarget
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
  }
  return (
  <footer className={`${styles.footer} ${peek ? styles.peek : ''}`}>
      <div className={styles.inner}>
        <p>© {new Date().getFullYear()} Sole X. All rights reserved.</p>
        <div className={styles.signature} aria-label="Site creator signature">
          <span className={styles.by}>Developer:</span>
          <FaLaptopCode className={styles.devIcon} aria-hidden="true" />
          <span className={styles.nameWrap} onMouseMove={onNameMove} onMouseLeave={onNameLeave}>
            <span className={styles.nameBase} data-name="Mikhail James P. Navarro">Mikhail James P. Navarro</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
