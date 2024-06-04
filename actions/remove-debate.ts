'use server'

import { revalidatePath } from 'next/cache'
import postgres from 'postgres'
import { z } from 'zod'

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})

export default async function deleteDebate(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    topic: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
    topic: formData.get('topic'),
  })

  try {
    await sql`
      DELETE FROM debates
      WHERE id = ${data.id};
    `

    revalidatePath('/')
    return { message: `Deleted debate ${data.topic}` }
  } catch (e) {
    return { message: 'Failed to delete debate' }
  }
}