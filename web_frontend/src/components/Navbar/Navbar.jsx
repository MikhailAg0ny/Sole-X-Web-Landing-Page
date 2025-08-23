import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <img src="/solex-logo.png" alt="Sole-X" height="28" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }} />
          <span>Sole-X</span>
        </Link>
  <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? styles.active : undefined}>Services</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : undefined}>Gallery</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : undefined}>Contact</NavLink>
        </nav>
  <ThemeToggle />
      </div>
    </header>
  )
}
