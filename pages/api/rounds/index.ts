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
    const rounds = await prisma.round.findMany({ include: { holeStats: true, course: true } })
    return res.json(rounds)
  }

  if (req.method === 'POST') {
    const token = getTokenFromReq(req)
    const payload = token ? verifyToken(token) : null
    if (!payload) return res.status(401).json({ error: 'Unauthorized' })

    const { courseId, roundDate, teeBox, weather, notes, totalScore, holeStats } = req.body
    if (!roundDate || !holeStats) return res.status(400).json({ error: 'Missing fields' })

    const round = await prisma.round.create({
      data: {
        userId: payload.userId,
        courseId: courseId || undefined,
        roundDate: new Date(roundDate),
        teeBox,
        weather,
        notes,
        totalScore: totalScore ? Number(totalScore) : undefined,
        holeStats: {
          create: holeStats.map((h: any) => ({
            holeNumber: Number(h.holeNumber),
            par: Number(h.par),
            score: Number(h.score),
            fairwayHit: !!h.fairwayHit,
            gir: !!h.gir,
            putts: Number(h.putts),
            penalties: Number(h.penalties || 0),
            notes: h.notes || null,
          })),
        },
      },
      include: { holeStats: true },
    })

    return res.status(201).json(round)
  }

  res.status(405).end()
}
