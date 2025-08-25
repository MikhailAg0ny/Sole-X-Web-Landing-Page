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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const { body } = document
    if (!body) return
    const prev = body.style.overflow
    if (open) body.style.overflow = 'hidden'
    else body.style.overflow = prev || ''
    return () => { body.style.overflow = prev || '' }
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoWrapper}>
            <img src="/solex-logo.png" alt="Sole-X" height="28" />
          </div>
          <span className={styles.brandText}>Sole X</span>
        </Link>
        
        <button 
          className={`${styles.burger} ${open ? styles.open : ''}`} 
          aria-label="Menu" 
          aria-expanded={open} 
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        
        <nav id="site-nav" className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Main">
          <div className={styles.navLinks}>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onClick={() => setOpen(false)}
            >
              Services
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onClick={() => setOpen(false)}
            >
              Contact Us
            </NavLink>
          </div>
        </nav>
        
        <div className={styles.rightSection}>
          <ThemeToggle />
        </div>
      </div>
      
      {/* Mobile overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </header>
  )
}
