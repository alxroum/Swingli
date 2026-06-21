import Layout from '../../components/Layout'
import { useState } from 'react'

function HoleRow({ hole, onChange }: any) {
  return (
    <div className="grid grid-cols-7 gap-2 items-center p-2 border-b">
      <div className="text-sm">{hole.holeNumber}</div>
      <input className="p-1 border rounded" value={hole.par} onChange={(e) => onChange('par', e.target.value)} />
      <input className="p-1 border rounded" value={hole.score} onChange={(e) => onChange('score', e.target.value)} />
      <input type="checkbox" checked={hole.fairwayHit} onChange={(e) => onChange('fairwayHit', e.target.checked)} />
      <input type="checkbox" checked={hole.gir} onChange={(e) => onChange('gir', e.target.checked)} />
      <input className="p-1 border rounded" value={hole.putts} onChange={(e) => onChange('putts', e.target.value)} />
      <input className="p-1 border rounded" value={hole.penalties} onChange={(e) => onChange('penalties', e.target.value)} />
    </div>
  )
}

export default function RoundsPage() {
  const [holes, setHoles] = useState(() => Array.from({ length: 18 }).map((_, i) => ({ holeNumber: i + 1, par: 4, score: 4, fairwayHit: false, gir: false, putts: 2, penalties: 0 })))

  function updateHole(index: number, key: string, value: any) {
    setHoles((prev) => {
      const copy = [...prev]
      // @ts-ignore
      copy[index] = { ...copy[index], [key]: value }
      return copy
    })
  }

  async function saveRound() {
    const payload = {
      roundDate: new Date().toISOString(),
      holeStats: holes,
    }
    await fetch('/api/rounds', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
    alert('Saved (server) - check API')
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">New Round</h1>
      <div className="border rounded overflow-hidden">
        <div className="grid grid-cols-7 gap-2 p-2 bg-slate-50 dark:bg-slate-800 font-semibold">
          <div>Hole</div>
          <div>Par</div>
          <div>Score</div>
          <div>FW</div>
          <div>GIR</div>
          <div>Putts</div>
          <div>Pen</div>
        </div>
        {holes.map((h, i) => (
          <HoleRow key={i} hole={h} onChange={(k: string, v: any) => updateHole(i, k, v)} />
        ))}
      </div>
      <div className="mt-4">
        <button onClick={saveRound} className="px-4 py-2 bg-green-600 text-white rounded">Save Round</button>
      </div>
    </Layout>
  )
}
