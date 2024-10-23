'use server'

import { revalidatePath } from 'next/cache'
import postgres from 'postgres'
import { z } from 'zod'

const sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
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
  } catch (error: any) {
    throw new Error(`Failed to delete turn: ${error.message}`)
  }
}
