import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { hashPassword, signToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'User exists' })

  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({ data: { email, passwordHash } })

  const token = signToken({ userId: user.id })
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}`)
  return res.status(201).json({ id: user.id, email: user.email })
}
