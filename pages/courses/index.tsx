import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetch('/api/courses').then((r) => r.json()).then(setCourses)
  }, [])

  async function createCourse() {
    const res = await fetch('/api/courses', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, par: 72 }) })
    if (res.ok) {
      const data = await res.json()
      setCourses((s) => [data, ...s])
      setName('')
    } else {
      alert('Create failed; ensure you are logged in')
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Course name" className="p-2 border rounded flex-1" />
        <button onClick={createCourse} className="px-3 py-2 bg-green-600 text-white rounded">Create</button>
      </div>
      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="p-2 border rounded">{c.name} — Par {c.par}</div>
        ))}
      </div>
    </Layout>
  )
}
