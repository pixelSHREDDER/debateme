import { TDebate } from '@/lib/prisma-types'
import { DebateStatus } from '@prisma/client'
import { createTurns } from './turns'

export const createDebates: () => TDebate[] = () => {
  const createdAtDate = new Date('2024-04-13T12:24:02Z')
  const cooldownDate = new Date()
  const createdTurns = createTurns()

  return [
    {
      id: 1,
      topic: 'Your turn',
      createdAt: createdAtDate,
      creatorSub: 'auth0|1234567890abcdefghij1234',
      opponentSub: 'auth0|abcdefghij1234567890abcd',
      cooldownMins: 60,
      turn: createdTurns,
      status: DebateStatus.CreatorTurn,
    },
    {
      id: 2,
      topic: 'Opponent\'s Turn',
      createdAt: createdAtDate,
      creatorSub: 'auth0|1234567890abcdefghij1234',
      opponentSub: 'auth0|abcdefghij1234567890abcd',
      cooldownMins: 60,
      status: DebateStatus.OpponentTurn,
      turn: [
        createdTurns[0],
      ],
    },
    {
      id: 3,
      topic: 'Wait for Cooldown',
      createdAt: createdAtDate,
      creatorSub: 'auth0|1234567890abcdefghij1234',
      opponentSub: 'auth0|abcdefghij1234567890abcd',
      cooldownMins: 60,
      status: DebateStatus.CreatorCooldown,
      turn: [
        createdTurns[0],
        {
          ...createdTurns[1],
          createdAt: cooldownDate,
        },
      ],
    },
    {
      id: 4,
      topic: 'No opponent',
      createdAt: createdAtDate,
      creatorSub: 'auth0|1234567890abcdefghij1234',
      opponentSub: null,
      cooldownMins: 60,
      status: DebateStatus.NoOpponent,
    },
    {
      id: 5,
      topic: 'You\'re Invited to join',
      createdAt: createdAtDate,
      creatorSub: 'auth0|abcdefghij1234567890abcd',
      opponentSub: null,
      cooldownMins: 60,
      status: DebateStatus.NoOpponent,
    },
  ] as const
}
