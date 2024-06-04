'use server'

import prisma from '@/lib/prisma'

export default async function getInviteDebateId(inviteId: string) {
  let inviteData = null

  try {
    inviteData = await prisma.invite.findUnique({
      where: { id: inviteId },
      select: { debateId: true }
    })
  } catch (error: any) {
    throw new Error(error)
  }

  return inviteData?.debateId
}