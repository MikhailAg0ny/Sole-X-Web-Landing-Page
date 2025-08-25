import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkHover = (linkName) => {
    setHoveredLink(linkName)
  }

  const handleLinkLeave = () => {
    setHoveredLink(null)
  }

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
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        
        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          <div className={styles.navLinks}>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onMouseEnter={() => handleLinkHover('home')}
              onMouseLeave={handleLinkLeave}
              onClick={() => setOpen(false)}
            >
              Home
              {hoveredLink === 'home' && <div className={styles.linkUnderline} />}
            </NavLink>
            
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onMouseEnter={() => handleLinkHover('services')}
              onMouseLeave={handleLinkLeave}
              onClick={() => setOpen(false)}
            >
              Services
              {hoveredLink === 'services' && <div className={styles.linkUnderline} />}
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onMouseEnter={() => handleLinkHover('contact')}
              onMouseLeave={handleLinkLeave}
              onClick={() => setOpen(false)}
            >
              Contact Us
              {hoveredLink === 'contact' && <div className={styles.linkUnderline} />}
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
