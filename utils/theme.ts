export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(t: 'light' | 'dark') {
  if (typeof document === 'undefined') return
  const el = document.documentElement
  if (t === 'dark') el.classList.add('dark')
  else el.classList.remove('dark')
  try { window.localStorage.setItem('theme', t) } catch {}
}

export function initTheme() {
  const t = getTheme()
  setTheme(t)
}
