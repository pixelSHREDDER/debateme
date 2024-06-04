'use server'

import prisma from '@/lib/prisma'

export default async function getInviteId(debateId: number) {
  let inviteData = null

  try {
    inviteData = await prisma.invite.findUnique({
      where: { debateId },
      select: { id: true }
    })
  } catch (error: any) {
    throw new Error(error)
  }

  return inviteData?.id
}