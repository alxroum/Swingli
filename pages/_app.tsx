import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { initTheme } from '../utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initTheme()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return <Component {...pageProps} />
}
