import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { getOfflineRounds, clearOfflineRounds } from '../utils/indexeddb'
import { getTheme, setTheme } from '../utils/theme'

export default function Settings() {
  const [offlineCount, setOfflineCount] = useState<number | null>(null)
  const [theme, setThemeState] = useState<'light' | 'dark'>(getTheme())

  useEffect(() => {
    getOfflineRounds().then((r) => setOfflineCount(r.length))
  }, [])

  async function clearOffline() {
    await clearOfflineRounds()
    setOfflineCount(0)
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4 max-w-md">
        <div className="p-3 border rounded flex items-center justify-between">
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-slate-600">Toggle between light and dark</div>
          </div>
          <button onClick={toggleTheme} className="px-3 py-1 border rounded">{theme === 'dark' ? 'Dark' : 'Light'}</button>
        </div>

        <div className="p-3 border rounded flex items-center justify-between">
          <div>
            <div className="font-medium">Offline rounds</div>
            <div className="text-sm text-slate-600">Rounds saved locally when offline</div>
          </div>
          <div className="text-right">
            <div>{offlineCount ?? '—'}</div>
            <button onClick={clearOffline} className="mt-2 px-2 py-1 border rounded text-sm">Clear</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
