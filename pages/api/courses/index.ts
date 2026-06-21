import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../../lib/auth'

function getTokenFromReq(req: NextApiRequest) {
  const cookie = req.headers.cookie
  if (!cookie) return null
  const m = cookie.match(/(?:^|; )token=([^;]+)/)
  return m ? m[1] : null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const courses = await prisma.course.findMany()
    return res.json(courses)
  }

  if (req.method === 'POST') {
    const token = getTokenFromReq(req)
    const payload = token ? verifyToken(token) : null
    if (!payload) return res.status(401).json({ error: 'Unauthorized' })

    const { name, city, state, par } = req.body
    if (!name || !par) return res.status(400).json({ error: 'Missing fields' })

    const course = await prisma.course.create({ data: { name, city, state, par: Number(par) } })
    return res.status(201).json(course)
  }

  res.status(405).end()
}
