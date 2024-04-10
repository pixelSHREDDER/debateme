import NewTurn from '@/components/Turn/NewTurn'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'

interface IDebate {
  params: { slug: string }
}

async function getDebate(id: number) {
  try {
    const debate = await prisma.debate.findUnique({
      where: { id: Number(id) },
      include: { turn: true }
    });

    if (!debate) notFound()

    return debate
  } catch (error: any) {
    throw error
  }
}

export default async function Debate({ params }: IDebate) {
  const debate: TDebate = await getDebate(parseInt(params.slug))

  return (
    <section>
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      <NewTurn debate={debate} />
    </section>
  )
}