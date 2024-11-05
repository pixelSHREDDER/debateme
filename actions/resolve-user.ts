'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import addUser from './add-user'

export default async function resolveUser(email: string, sub: string, redirectTo: string) {
  let userData = null

  try {
    userData = await prisma.user.findFirstOrThrow({
      where: { sub },
    })
    revalidatePath('/')
  } catch (error: any) {
    await addUser(email, sub)
  }

  redirect(redirectTo)
}
