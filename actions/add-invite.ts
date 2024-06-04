'use server'

import prisma from '@/lib/prisma'

export async function addInvite(debateId: number) {
  try {
    await prisma.invite.create({
      data: {
        debate: {
          connect: {
            id: debateId,
          },
        }
      },
    })
  } catch (error: any) {
    throw new Error(error)
  }
}