import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const [footerPeek, setFooterPeek] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastY = window.scrollY || 0
    const recalc = () => {
      const y = window.scrollY || 0
      const dirDown = y > lastY
      lastY = y
      const docH = document.documentElement.scrollHeight
      const winH = window.innerHeight
      const noScroll = docH <= winH
      const nearBottom = y + winH >= docH - 220 // threshold
      setFooterPeek(noScroll || (nearBottom && dirDown))
    }
    window.addEventListener('scroll', recalc, { passive: true })
    window.addEventListener('resize', recalc)
    // initial calculation (for non-scrollable pages)
    recalc()
    return () => {
      window.removeEventListener('scroll', recalc)
      window.removeEventListener('resize', recalc)
    }
  }, [])

  // Recalculate on route changes to handle pages with different heights
  useEffect(() => {
    const recalcAfterPaint = () => {
      const y = window.scrollY || 0
      const docH = document.documentElement.scrollHeight
      const winH = window.innerHeight
      const noScroll = docH <= winH
      const nearBottom = y + winH >= docH - 220
      setFooterPeek(noScroll || nearBottom)
    }
    // Wait for new route content to render and layout
    requestAnimationFrame(() => requestAnimationFrame(recalcAfterPaint))
  }, [location.pathname])
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer peek={footerPeek} />
    </div>
  )
}
