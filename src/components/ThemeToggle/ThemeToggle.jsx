'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    /* Default is light — only apply dark if explicitly saved */
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-14 h-7 rounded-pill
        bg-text-secondary/20 dark:bg-text-dark-secondary/20
        transition-colors duration-400
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent
        cursor-pointer
      "
    >
      <span className={`
        absolute top-0.5 left-0.5 w-6 h-6 rounded-full
        bg-bg-light dark:bg-bg-dark
        shadow-card
        transition-transform duration-400 ease-smooth
        flex items-center justify-center text-sm
        ${dark ? 'translate-x-7' : 'translate-x-0'}
      `}>
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
