import { useEffect, useState } from 'react'
import { PiCursorThin } from 'react-icons/pi'
import styles from './CursorToggle.module.css'

const STORAGE_KEY = 'cursorMode' // 'custom' | 'system'

export default function CursorToggle() {
  const [mode, setMode] = useState('custom')

  // Init from localStorage and apply attribute
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial = saved === 'system' ? 'system' : 'custom'
    setMode(initial)
    applyAttr(initial)
  }, [])

  const applyAttr = (m) => {
    const root = document.documentElement
    if (!root) return
    root.setAttribute('data-cursor', m)
  }

  const toggle = () => {
    setMode((prev) => {
      const next = prev === 'custom' ? 'system' : 'custom'
      try { localStorage.setItem(STORAGE_KEY, next) } catch {}
      applyAttr(next)
      return next
    })
  }

  const label = mode === 'system' ? 'Use custom cursor' : 'Use system cursor'

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={mode === 'system'}
      data-tip={label}
    >
      <span className={styles.wrap} aria-hidden="true">
        <PiCursorThin className={styles.icon} size={18} />
        <span className={`${styles.dot} ${mode === 'custom' ? styles.dotAccent : ''}`} />
      </span>
    </button>
  )
}
