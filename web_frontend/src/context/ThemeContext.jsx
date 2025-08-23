import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      return
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const value = useMemo(() => ({
    theme,
    /**
     * Toggle theme. Optionally pass { x, y } (client coords) to center a circular reveal at that point.
     */
    toggle: (coords) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Set origin for the reveal animation
  const x = coords?.x ?? Math.round(window.innerWidth / 2)
  const y = coords?.y ?? Math.round(window.innerHeight / 2)
  const fromLeft = x < window.innerWidth / 2
  // Configure wave: clip from left or right with big rounded leading edge
  document.documentElement.style.setProperty('--clip-left', fromLeft ? '0%' : '100%')
  document.documentElement.style.setProperty('--clip-right', fromLeft ? '100%' : '0%')
  document.documentElement.style.setProperty('--r1', fromLeft ? '0' : '0')
  document.documentElement.style.setProperty('--r2', '40vmax')
  document.documentElement.style.setProperty('--r3', '40vmax')
  document.documentElement.style.setProperty('--r4', fromLeft ? '0' : '0')

      const doSet = () => setTheme(next)
      if (!prefersReduced && document.startViewTransition) {
        document.startViewTransition(() => {
          doSet()
        })
      } else {
        doSet()
      }
    }
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
