'use server'

import prisma from '@/lib/prisma'

export default async function getDebateTurns(debateId: number, userSub: string) {
  let debateData = null

  try {
    debateData = await prisma.debate.findUniqueOrThrow({
      where: {
        id: Number(debateId),
        AND: {
          OR: [
            { creatorSub: userSub },
            { opponentSub: userSub }
          ]
        }
      },
      include: { turn: true }
    })
  } catch (error: any) {
    return error
  }

  return debateData
}