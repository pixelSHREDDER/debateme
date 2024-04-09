import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Turns from '@/components/Turn/Turns';
import { Debate } from '@prisma/client';
import NewTurn from '@/components/Turn/NewTurn';

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

export default async function DebatePage({ params }: IDebate) {
  const debate: Debate = await getDebate(parseInt(params.slug))


  return (
    <section>
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      <NewTurn debate={debate} />
    </section>
  )
}