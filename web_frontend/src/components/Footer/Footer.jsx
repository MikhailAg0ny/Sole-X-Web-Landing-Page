import styles from './Footer.module.css'

export default function Footer({ peek = false }) {
  return (
  <footer className={`${styles.footer} ${peek ? styles.peek : ''}`}>
      <div className={styles.inner}>
        <p>© {new Date().getFullYear()} Sole X. All rights reserved.</p>
      </div>
    </footer>
  )
}
