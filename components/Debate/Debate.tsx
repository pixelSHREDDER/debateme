import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'

function checkCooldownPeriod(debate: TDebate) {
  let lastTurn = debate.turn?.at(-1)

  if (!debate.turn || !debate.turn.length || !lastTurn) {
    return true
  }

  return (Date.now() - new Date(lastTurn.createdAt).getTime() > (60 * 100_000))
}

export default function Debate({ debate }: { debate: TDebate }) {
  return (
    <section>
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      { checkCooldownPeriod(debate) ?
        <NewTurn debate={debate} /> :
        "wait for cooldown"
      }
    </section>
  )
}