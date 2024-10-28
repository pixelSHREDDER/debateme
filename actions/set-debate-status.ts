'use server'

import prisma from '@/lib/prisma'
import { DebateStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export default async function setDebateStatus(debateId: number, status: DebateStatus) {
  try {
    await prisma.debate.update({
      where: {
        id: debateId,
      },
      data: {
        status,
      },
    })

    revalidatePath(`/debate/${debateId}`)
  } catch (error: any) {
    throw new Error(`Failed to set debate status: ${error.message}`)
  }
}
