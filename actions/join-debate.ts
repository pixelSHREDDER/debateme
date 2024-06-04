'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export default async function joinDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    debateId: z.coerce.number().min(0),
    opponentSub: z.string().min(1)
  })
  const parse = schema.safeParse({
    debateId: formData.get('debateId'),
    opponentSub: formData.get('opponentSub'),
  })

  if (!parse.success) {
    return { message: `Please fix the following errors: ${parse.error.errors.map(error => error.message)}`}
  }

  const data = parse.data

  try {
    await prisma.debate.update({
      where: {
        id: data.debateId
      },
      data: {
        opponent: {
          connect: {
            sub: data.opponentSub,
          },
        }
      },
    })

    revalidatePath(`/debate/${data.debateId}`)
  } catch (e: any) {
    return { message: `Failed to join debate: ${e.message}` }
  }
}