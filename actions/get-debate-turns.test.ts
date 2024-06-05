import getDebateTurns from './get-debate-turns'
import prisma from '@/lib/__mocks__/prisma'
import { expect, test, vi } from 'vitest'
import { TDebate } from '@/lib/prisma-types'

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
  const error = new Error
  prisma.debate.findUniqueOrThrow.mockImplementationOnce(() => { throw error })

  const response = await getDebateTurns(1, '0')
  expect(response).toBe(error)
})