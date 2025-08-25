import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <img src="/solex-logo.png" alt="Sole-X" height="28" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }} />
          <span>Sole X</span>
        </Link>
        <button className={styles.burger} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>
  <nav className={`${styles.nav} ${open ? styles.open : ''}`} onClick={() => setOpen(false)}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? styles.active : undefined}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : undefined}>Contact Us</NavLink>
        </nav>
  <ThemeToggle />
      </div>
    </header>
  )
}
