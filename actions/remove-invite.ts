'use server'

import prisma from '@/lib/prisma'

export default async function removeInvite(inviteId: string) {
  try {
    await prisma.invite.deleteUnique({
      where: { id: inviteId }
    })
  } catch (error: any) {
    throw new Error(error)
  }
}