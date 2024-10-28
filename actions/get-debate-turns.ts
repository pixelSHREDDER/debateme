'use server'

import prisma from '@/lib/prisma'
import { DebateStatus } from '@prisma/client'
import resolveUnknownDebateStatus from './resolve-unknown-debate-status'
import resolveDebateCooldown from './resolve-debate-cooldown'

export default async function getDebateTurns(debateId: number, userSub: string) {
  let debateData = null

  try {
    debateData = await prisma.debate.findUniqueOrThrow({
      where: {
        id: Number(debateId),
        AND: {
          OR: [
            { creatorSub: userSub },
            { opponentSub: userSub },
          ],
        },
      },
      include: { turn: true },
    })

    if (debateData.status === DebateStatus.Unknown) {
      await resolveUnknownDebateStatus(debateData)
    } else if (
      (debateData.status === DebateStatus.CreatorCooldown) ||
      (debateData.status === DebateStatus.OpponentCooldown)
     ) {
      await resolveDebateCooldown(debateData)
    }
  } catch (error: any) {
    throw new Error(`Failed to find debate with turns: ${error.message}`)
  }

  return debateData
}
