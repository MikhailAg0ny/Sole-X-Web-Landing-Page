import { useTheme } from '../../context/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Activate Light Mode' : 'Activate Dark Mode'
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    toggle({ x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) })
  }
  return (
    <button
      className={styles.btn}
      onClick={handleClick}
      aria-label={label}
      title={label}
      data-tip={label}
    >
      {isDark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 19.5L19 18M5 19l-1.5 1.5M20.5 4.5L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      )}
    </button>
  )
}
