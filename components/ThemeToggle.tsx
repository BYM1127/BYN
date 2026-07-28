'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'transparent',
          border: '1px solid transparent',
        }}
        aria-label="Toggle theme placeholder"
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
      aria-label="Toggle light and dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={18} style={{ color: '#f59e0b' }} />
      ) : (
        <Moon size={18} style={{ color: 'var(--color-text-primary)' }} />
      )}
    </button>
  )
}
