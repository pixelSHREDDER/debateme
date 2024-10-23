'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import removeInvite from './remove-invite'

export default async function joinDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    debateId: z.coerce.number().min(0),
    inviteId: z.coerce.string().min(1),
    opponentSub: z.string().min(1),
  })
  const parse = schema.safeParse({
    debateId: formData.get('debateId'),
    inviteId: formData.get('inviteId'),
    opponentSub: formData.get('opponentSub'),
  })

  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}` }
  }

  const { data } = parse

  try {
    await prisma.debate.update({
      where: {
        id: data.debateId,
      },
      data: {
        opponent: {
          connect: {
            sub: data.opponentSub,
          },
        },
      },
    })

    await removeInvite(data.inviteId)

    revalidatePath(`/debate/${data.debateId}`)
  } catch (error: any) {
    throw new Error(`Failed to join debate: ${error.message}`)
  }

  redirect(`/debate/${data.debateId}`)
}
