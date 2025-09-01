import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sole: {
          primary: '#2E6F4E',
          sage: '#A3B18A',
          red: '#ff4757'
        }
      },
      container: { center: true, padding: '1rem' }
    }
  },
  plugins: [typography, forms, aspectRatio, containerQueries]
}
