import prisma from '@/lib/__mocks__/prisma'
import { expect, test, vi } from 'vitest'
import { TDebate } from '@/lib/prisma-types'
import { DebateStatus } from '@prisma/client'
import getDebateTurns from './get-debate-turns'

vi.mock('@/lib/prisma')

test('getDebateTurns should return an object with the requested debate and its associated turns', async () => {
  const createdAtDate = new Date()
  const mockDebate: TDebate = {
    id: 1,
    topic: 'Fool me once',
    cooldownMins: 60,
    createdAt: createdAtDate,
    creatorSub: '0',
    opponentSub: null,
    status: DebateStatus.NoOpponent,
    turn: []
  }
  prisma.debate.findUniqueOrThrow.mockResolvedValueOnce(mockDebate)

  const debate = await getDebateTurns(1, '0')
  expect(debate).toStrictEqual({
    ...mockDebate,
    turn: []
  })
})

test('getDebateTurns should return an error when the requested debate cannot be found', async () => {
  const error = new Error('test error')
  prisma.debate.findUniqueOrThrow.mockImplementationOnce(() => { throw error })

  await expect(getDebateTurns(1, '0')).rejects.toThrow(/Failed to find debate with turns/)
})
