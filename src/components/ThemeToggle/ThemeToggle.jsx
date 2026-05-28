'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const defaultTheme = savedTheme || 'light'
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-theme')
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
