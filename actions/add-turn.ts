'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function addTurn(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    body: z.string().min(1),
    debateId: z.number().min(1)
  })
  const parse = schema.safeParse({
    body: formData.get('body'),
    debateId: formData.get('debateId'),
  })

  if (!parse.success) {
    return { message: 'Failed to create turn' }
  }

  const data = parse.data

  try {
    const bodyJSON = JSON.stringify(data.body)
    await prisma.turn.create({
      data: {
        body: bodyJSON,
        debateId: data.debateId
      },
    })

    revalidatePath('/')
    return { message: `Created turn for debate ${data.debateId}` }
  } catch (e) {
    return { message: 'Failed to create turn' }
  }
}