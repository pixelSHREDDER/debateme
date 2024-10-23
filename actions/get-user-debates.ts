'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function getUserDebates(userSub: string) {
  let userData = null

  try {
    userData = await prisma.user.findFirst({
      where: { sub: userSub },
      include: {
        debatesCreated: true,
        debatesOpposed: true,
      },
    })
    revalidatePath('/')
  } catch (error: any) {
    throw new Error(`Failed to find user and debates: ${error.message}`)
  }

  return userData
}
