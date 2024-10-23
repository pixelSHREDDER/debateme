'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import getCreatedDebateId from '@/actions/get-created-debate-id'
import addInvite from './add-invite'

export default async function addDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    topic: z.string().min(1),
    cooldownMins: z.coerce.number().min(0).default(60),
    creatorSub: z.string().min(1),
  })
  const parse = schema.safeParse({
    topic: formData.get('topic'),
    cooldownMins: formData.get('cooldownMins'),
    creatorSub: formData.get('creatorSub'),
  })

  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}` }
  }

  const { data } = parse
  let debateId

  try {
    await prisma.debate.create({
      data: {
        topic: data.topic,
        cooldownMins: data.cooldownMins,
        creator: {
          connect: {
            sub: data.creatorSub,
          },
        },
      },
    })
    revalidatePath('/debate')
  } catch (error: any) {
    throw new Error(`Failed to create debate: ${error.message}`)
  }

  try {
    debateId = await getCreatedDebateId(data.creatorSub)
  } catch (error: any) {
    throw new Error(`Failed to find newly created debate: ${error.message}`)
  }

  try {
    if (typeof debateId === 'number') {
      await addInvite(debateId)
    }
  } catch (error: any) {
    throw new Error(`Failed to create invite for newly created debate: ${error.message}`)
  }

  redirect(`/debate/${debateId}`)
}
