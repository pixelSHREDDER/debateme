'use server'

import prisma from '@/lib/prisma'

export default async function getInviteId(debateId: number) {
  let inviteData = null

  try {
    inviteData = await prisma.invite.findUniqueOrThrow({
      where: { debateId },
      select: { id: true }
    })
  } catch (error: any) {
    return error
  }

  return inviteData?.id
}