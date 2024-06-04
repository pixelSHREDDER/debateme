'use server'

import { revalidatePath } from 'next/cache'
import postgres from 'postgres'
import { z } from 'zod'

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})

export default async function deleteTurnFromDebate(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
  })

  try {
    await sql`
      DELETE FROM turns
      WHERE id = ${data.id};
    `

    revalidatePath('/')
    return { message: `Deleted turn ${data.id}` }
  } catch (e) {
    return { message: 'Failed to delete turn' }
  }
}