import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function resetDb() {
  await prisma.$transaction([
    prisma.invite.deleteMany(),
    prisma.turn.deleteMany(),
    prisma.debate.deleteMany(),
    prisma.user.deleteMany()
  ])
}