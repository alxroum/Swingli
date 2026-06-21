import Layout from '../components/Layout'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Dashboard() {
  const { data: rounds } = useSWR('/api/rounds', fetcher)

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section>
        <h2 className="font-semibold">Recent Rounds</h2>
        <div className="mt-2">
          {!rounds && <p>Loading...</p>}
          {rounds && rounds.length === 0 && <p>No rounds yet.</p>}
          {rounds && rounds.map((r: any) => (
            <div key={r.id} className="p-2 border rounded mb-2">
              <div className="text-sm">{new Date(r.roundDate).toLocaleDateString()}</div>
              <div className="font-medium">Score: {r.totalScore ?? '—'}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
