'use server'

import prisma from '@/lib/prisma'

export default async function getInviteDebateId(inviteId: string) {
  let inviteData = null

  try {
    inviteData = await prisma.invite.findUniqueOrThrow({
      where: { id: inviteId },
      select: { debateId: true }
    })
  } catch (error: any) {
    return error
  }

  return inviteData?.debateId
}