'use server'

import { TDebate } from '@/lib/prisma-types'
import { DebateStatus } from '@prisma/client'
import setDebateStatus from './set-debate-status'
import resolveDebateCooldown from './resolve-debate-cooldown'

export default async function resolveUnknownDebateStatus(debate: TDebate) {
  try {
    if (debate.opponentSub === null) {
      await setDebateStatus(debate.id, DebateStatus.NoOpponent)
      return
    }

    const lastTurn = debate.turn?.at(-1)

    if (
      !debate.turn ||
      !debate.turn.length ||
      !lastTurn
    ) {
      await setDebateStatus(debate.id, DebateStatus.CreatorTurn)
      return
    }

    await resolveDebateCooldown(debate)
  } catch (error: any) {
    throw new Error(`Failed to resolve unknown debate status: ${error.message}`)
  }
}
