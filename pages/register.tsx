import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
    if (res.ok) router.push('/dashboard')
    else alert('Register failed')
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create account</h1>
        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          <div className="flex justify-end">
            <button className="px-3 py-2 bg-green-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
