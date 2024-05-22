'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import getCreatedDebateId from '@/actions/get-created-debate-id'

export async function addDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    topic: z.string().min(1),
    creatorSub: z.string().min(1)
  })
  const parse = schema.safeParse({
    topic: formData.get('topic'),
    creatorSub: formData.get('creatorSub'),
  })

  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}`}
  }

  const data = parse.data
  let debateId

  try {
    await prisma.debate.create({
      data: {
        topic: data.topic,
        creator: {
          connect: {
            sub: data.creatorSub,
          },
        }
      },
    })
    revalidatePath('/debate')
  } catch (e: any) {
    return { message: `Failed to create debate: ${e.message}` }
  }

  try {
    debateId = await getCreatedDebateId(data.creatorSub)
  } catch (e: any) {
    return { message: `Failed to find newly created debate: ${e.message}` }
  }

  redirect(`/debate/${debateId}`)
}