import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 800px)').matches : false
  )
  const [scrolled, setScrolled] = useState(false)
  const linksRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Watch viewport to separate mobile vs desktop UX and auto-close menu on desktop
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 800px)')
    const onChange = (e) => {
      setIsMobile(e.matches)
      if (!e.matches) {
        // Leaving mobile -> desktop, ensure menu is closed
        setOpen(false)
      }
    }
    // Initialize and subscribe
    onChange(mq)
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const { body } = document
    if (!body) return
    const prev = body.style.overflow
    if (open && isMobile) body.style.overflow = 'hidden'
    else body.style.overflow = prev || ''
    return () => { body.style.overflow = prev || '' }
  }, [open, isMobile])

  // Accessibility: focus first nav link when menu opens and close on Escape
  useEffect(() => {
    if (open && linksRef.current) {
      const first = linksRef.current.querySelector('a')
      if (first) first.focus()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
        
        <nav
          id="site-nav"
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label="Main"
          aria-hidden={isMobile ? !open : undefined}
        >
          <div className={styles.navHeader}>
            <span className={styles.menuLabel}>Menu</span>
            <button
              type="button"
              className={styles.close}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.29l6.29 6.3 6.29-6.3z"/>
              </svg>
            </button>
          </div>
          <div className={styles.navLinks} ref={linksRef}>
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
