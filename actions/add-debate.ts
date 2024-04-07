'use server'

// import postgres from 'postgres'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

/*let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})*/

// INSERT INTO debates (
//   id SERIAL PRIMARY KEY,
//   topic TEXT NOT NULL
// )

export async function addDebate(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    topic: z.string().min(1)
  })
  const parse = schema.safeParse({
    topic: formData.get('topic'),
  })

  if (!parse.success) {
    return { message: 'Failed to create debate' }
  }

  const data = parse.data

  try {
    /*await sql`
      INSERT INTO debates
      VALUES (${data})
    `*/
    await prisma.debate.create({
      data: {
        topic: data.topic,
      },
    })

    revalidatePath('/')
    return { message: `Added debate ${data.topic}` }
  } catch (e) {
    return { message: 'Failed to create debate' }
  }
}