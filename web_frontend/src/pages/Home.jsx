import Hero from '../components/Hero/Hero'
import AboutFeatures from '../components/AboutFeatures/AboutFeatures'
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
  <section className="container max-w-screen-xl mx-auto px-4 sm:px-6 page-vspace page-gap" aria-label="Home">
      <div data-reveal>
        <Hero />
      </div>
      <div data-reveal>
        <AboutFeatures />
      </div>
    </section>
  )
}
