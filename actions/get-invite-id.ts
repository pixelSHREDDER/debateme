'use server'

import prisma from '@/lib/prisma'

export default async function getInviteId(debateId: number) {
  let inviteData = null

  try {
    inviteData = await prisma.invite.findUniqueOrThrow({
      where: { debateId },
      select: { id: true },
    })
  } catch (error: any) {
    throw new Error(`Failed to find invite by id: ${error.message}`)
  }

  return inviteData.id
}
