import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Features from '../components/Features/Features'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('reveal-in')
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <div data-reveal><Hero /></div>
      <div data-reveal><About /></div>
      <div data-reveal><Features /></div>
    </>
  )
}
