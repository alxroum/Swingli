import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
    if (res.ok) router.push('/dashboard')
    else alert('Login failed')
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          <div className="flex justify-between items-center">
            <button className="px-3 py-2 bg-green-600 text-white rounded">Login</button>
            <a href="/register" className="text-sm text-slate-600">Create account</a>
          </div>
        </form>
      </div>
    </Layout>
  )
}
