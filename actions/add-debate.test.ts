import { expect, test, vi } from 'vitest'
import addDebate from './add-debate'
import prisma from '@/lib/__mocks__/prisma'
import { beforeEach } from 'node:test'

vi.mock('@/lib/prisma')

const createdAtDate = new Date()
let newDebateForm: FormData = new FormData()

beforeEach(() => {
  newDebateForm = new FormData()
  newDebateForm.set('creatorSub', '0')
  newDebateForm.set('cooldownMins', '60')
  newDebateForm.set('topic', 'Fool me once')
})

/*test('addDebate should return the generated debate', async () => {
  prisma.debate.create.mockResolvedValueOnce({
    id: 1,
    cooldownMins: 60,
    createdAt: createdAtDate,
    creatorSub: 'sub0',
    opponentSub: null,
    topic: 'Fool me once'
  })
  const debate = await addDebate({message: ''}, newDebateForm)
  expect(prisma.debate.create).toHaveBeenCalled()
  expect(debate).toStrictEqual({ ...newDebateForm, id: 1 })
})*/

test('addDebate should return an error when the form data is empty', async () => {
  const response = await addDebate({message: ''}, newDebateForm)
  expect(prisma.debate.create).not.toHaveBeenCalled()
  expect(response).toStrictEqual({ message: 'Please fix the following errors: Expected string, received null,Expected string, received null' })
})

/*test('addDebate should return an error when the debate was unable to be created', async () => {
  prisma.debate.create.mockImplementationOnce(() => { throw new Error })

  await expect(addDebate({message: ''}, newDebateForm)).toThrowError('derp')
  expect(prisma.debate.create).toHaveBeenCalled()
})*/