'use server'

import { TDebate } from '@/lib/prisma-types'
import { DebateStatus } from '@prisma/client'
import setDebateStatus from './set-debate-status'

export default async function resolveDebateCooldown(debate: TDebate) {
  try {
    const lastTurn = debate.turn?.at(-1)

    if (!lastTurn) {
      throw new Error('Last turn not found')
    }

    const isCooldownActive = (
      Date.now() - new Date(lastTurn.createdAt).getTime() < (debate.cooldownMins * 100_000)
    )

    if (isCooldownActive) {
      if (
        (
          (lastTurn.userSub === debate.creatorSub) &&
          (debate.status === DebateStatus.CreatorCooldown)
        ) || (
          (lastTurn.userSub === debate.opponentSub) &&
          (debate.status === DebateStatus.OpponentCooldown)
        )
       ) {
        return
      }
    }

    if (lastTurn.userSub === debate.creatorSub) {
      await setDebateStatus(debate.id, DebateStatus.OpponentTurn)
    } else if (lastTurn.userSub === debate.opponentSub) {
      await setDebateStatus(debate.id, DebateStatus.CreatorTurn)
    } else {
      throw new Error('Unable to determine current status')
    }
  } catch (error: any) {
    throw new Error(`Failed to check debate cooldown: ${error.message}`)
  }
}
