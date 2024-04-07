import { notFound } from 'next/navigation'
//import postgres from 'postgres'
import prisma from '@/lib/prisma'

interface IDebate {
  params: { slug: string }
}

/*let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})*/

async function getDebate(id: number) {
  try {
    //const debate = await sql`SELECT 1 FROM debates WHERE id = ${slug}`
    const debate = await prisma.debate.findUnique({
      where: { id: Number(id) },
    });

    if (!debate) {
      notFound()
    }

    return debate
  } catch (error: any) {
    throw error
  }
}

export default async function Debate({ params }: IDebate) {
  const debate = await getDebate(parseInt(params.slug))

  return (
    <section>
      <h1>{debate.topic}</h1>
    </section>
  )
}