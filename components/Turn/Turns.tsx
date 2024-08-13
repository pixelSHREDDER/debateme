import { TDebate, TTurn } from '@/lib/prisma-types'
import React, { Suspense } from 'react'
import Turn from './Turn'

export default function Turns({ debate }: { debate: TDebate }) {
  const turns = React.useMemo(() => debate.turn?.length ? debate.turn : [], [debate])

  return (
    <Suspense fallback="Now Loading....">
      <ul>
        {turns.map((turn: TTurn) => (
          <Turn key={turn.id}>
            {turn.body &&
              <div dangerouslySetInnerHTML={{ __html: turn.body }} />
            }
          </Turn>
        ))}
      </ul>
    </Suspense>
  )
}
