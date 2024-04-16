import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'

export default function Debate({ debate }: { debate: TDebate }) {
  return (
    <section>
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      <NewTurn debate={debate} />
    </section>
  )
}