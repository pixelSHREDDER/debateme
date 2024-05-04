'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function addDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    topic: z.string().min(1),
    creatorId: z.number().min(1)
  })
  const parse = schema.safeParse({
    topic: formData.get('topic'),
    creatorId: formData.get('creatorId'),
  })

  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}`}
  }

  const data = parse.data

  try {
    await prisma.debate.create({
      data: {
        topic: data.topic,
        creator: {
          connect: {
            id: data.creatorId,
          },
        }
      },
    })

    revalidatePath('/')
  } catch (e: any) {
    return { message: `Failed to create debate: ${e.message}` }
  }

  // redirect(`/debate/${data.id}`)
  redirect(`/debate/1`)
}