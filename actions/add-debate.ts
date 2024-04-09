'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function addDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    topic: z.string().min(1)
  })
  const parse = schema.safeParse({
    topic: formData.get('topic'),
  })

  if (!parse.success) {
    return { message: 'Failed to create debate' }
  }

  const data = parse.data

  try {
    await prisma.debate.create({
      data: {
        topic: data.topic,
      },
    })

    revalidatePath('/')
    return { message: `Added debate ${data.topic}` }
  } catch (e) {
    return { message: 'Failed to create debate' }
  }
}