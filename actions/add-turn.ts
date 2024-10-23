'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export default async function addTurn(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    body: z.string().min(1),
    debateId: z.string().min(1),
    userSub: z.string().min(1),
  })
  const parse = schema.safeParse({
    body: formData.get('bodyString'),
    debateId: formData.get('debateId'),
    userSub: formData.get('userSub'),
  })
  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}` }
  }

  const { data } = parse

  try {
    await prisma.turn.create({
      data: {
        body: data.body,
        debate: {
          connect: {
            id: parseInt(data.debateId, 10),
          },
        },
        user: {
          connect: {
            sub: data.userSub,
          },
        },
      },
    })

    revalidatePath(`/debate/${data.debateId}`)
    return { message: `Created turn for debate ${data.debateId}` }
  } catch (error: any) {
    throw new Error(`Failed to create turn: ${error.message}`)
  }
}
