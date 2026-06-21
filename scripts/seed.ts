import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.course.createMany({ data: [
    { name: 'Green Valley', city: 'Springfield', state: 'IL', par: 72 },
    { name: 'Lakeside', city: 'Austin', state: 'TX', par: 71 }
  ] })

  console.log('Seed complete')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
