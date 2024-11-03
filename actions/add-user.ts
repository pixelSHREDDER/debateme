'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function addUser(email: string, sub: string) {
  try {
    await prisma.user.create({
      data: {
        email,
        sub,
      },
    })
    revalidatePath('/')
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}
