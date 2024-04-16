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
    debateId: z.string().min(1)
  })
  const parse = schema.safeParse({
    body: formData.get('bodyString'),
    debateId: formData.get('debateId'),
  })
  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}`}
  }

  const data = parse.data

  try {
    const bodyJSON = data.body
    await prisma.turn.create({
      data: {
        body: bodyJSON,
        debateId: parseInt(data.debateId)
      },
    })

    revalidatePath('/')
    return { message: `Created turn for debate ${data.debateId}` }
  } catch (e: any) {
    return { message: `Failed to create turn: ${e.message}` }
  }
}