import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { verifyPassword, signToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = signToken({ userId: user.id })
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}`)
  return res.status(200).json({ id: user.id, email: user.email })
}
