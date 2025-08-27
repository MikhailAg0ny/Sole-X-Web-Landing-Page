import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import cursorPng from './assets/nike_air_jordan_1_cursor.png'

// Set up a scaled cursor so it matches normal cursor size without editing the source PNG
if (typeof document !== 'undefined') {
  const root = document.documentElement
  // Ensure a default cursor mode attribute early (default to 'custom')
  try {
    const savedMode = localStorage.getItem('cursorMode')
    if (!savedMode) localStorage.setItem('cursorMode', 'custom')
    root.setAttribute('data-cursor', savedMode === 'system' ? 'system' : 'custom')
  } catch {
    root.setAttribute('data-cursor', 'custom')
  }
  const TARGET_SIZE = 36 // typical cursor size in CSS pixels
  // Fractions within the drawn shoe where the pointer tip should be (x,y in [0..1])
  // Tweak these to fine-tune the toe position.
  const TOE_FX = 0.28
  const TOE_FY = 0.35

  function setCursor(url, hx = 8, hy = 8) {
    root.style.setProperty('--cursor-url', `url("${url}")`)
    root.style.setProperty('--cursor-hotspot-x', String(hx))
    root.style.setProperty('--cursor-hotspot-y', String(hy))
  }

  // Fallback immediately to the original asset so there's no flash of default cursor
  // Use a reasonable hotspot near the canvas top-left to feel like a pointer.
  setCursor(cursorPng, 12, 10)

  // Create a scaled data URL to approximate normal cursor size
  const img = new Image()
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = TARGET_SIZE
      canvas.height = TARGET_SIZE
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('2D context unavailable')

      // Compute uniform scale to fit within TARGET_SIZE while preserving aspect ratio
      const scale = Math.min(TARGET_SIZE / img.width, TARGET_SIZE / img.height)
      const dw = Math.max(1, Math.round(img.width * scale))
      const dh = Math.max(1, Math.round(img.height * scale))
      const dx = Math.floor((TARGET_SIZE - dw) / 2)
      const dy = Math.floor((TARGET_SIZE - dh) / 2)
      ctx.clearRect(0, 0, TARGET_SIZE, TARGET_SIZE)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, dx, dy, dw, dh)

      const dataUrl = canvas.toDataURL('image/png')
      const hx = Math.max(0, Math.min(TARGET_SIZE - 1, dx + Math.round(dw * TOE_FX)))
      const hy = Math.max(0, Math.min(TARGET_SIZE - 1, dy + Math.round(dh * TOE_FY)))
      setCursor(dataUrl, hx, hy)
    } catch (e) {
      // Keep fallback if something goes wrong
      setCursor(cursorPng, 12, 10)
    }
  }
  img.onerror = () => {
    setCursor(cursorPng, 12, 10)
  }
  img.src = cursorPng
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
