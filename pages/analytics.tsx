import Layout from '../components/Layout'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Analytics() {
  const { data: rounds } = useSWR('/api/rounds', fetcher)
  const chartData = (rounds || []).map((r: any) => ({ date: new Date(r.roundDate).toLocaleDateString(), score: r.totalScore || 0 }))

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div style={{ width: '100%', height: 300 }} className="bg-white dark:bg-slate-800 p-4 rounded">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#0f9d58" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  )
}
