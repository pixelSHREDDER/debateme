'use server'

import prisma from '@/lib/prisma'

export default async function getCreatedDebateId(creatorSub: string) {
  let debateData = null

  try {
    debateData = await prisma.debate.findFirst({
      where: { creatorSub },
      select: { id: true },
      orderBy: [{ createdAt: 'desc' }],
    })
  } catch (error: any) {
    throw new Error(`Failed to find newly created debate id: ${error.message}`)
  }

  return debateData?.id
}
