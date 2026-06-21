import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTheme, setTheme } from '../utils/theme'

export default function Header() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(getTheme())

  useEffect(() => {
    setThemeState(getTheme())
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <header className="border-b border-slate-200 dark:border-slate-700 p-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold">Golf Performance</Link>
          <nav className="hidden sm:block space-x-3">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/rounds">Rounds</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/courses">Courses</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme" className="px-3 py-1 border rounded">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <Link href="/login" className="px-3 py-1 border rounded">Login</Link>
          <Link href="/register" className="px-3 py-1 bg-green-600 text-white rounded">Register</Link>
        </div>
      </div>
    </header>
  )
}
