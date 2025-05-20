import { TDebate, TTurn } from '@/lib/prisma-types'
import React, { Suspense } from 'react'
import Turn from './Turn'
import classes from './Turns.module.css'

export default function Turns({ debate }: { debate: TDebate }) {
  const turns = React.useMemo(() => debate.turn?.length ? debate.turn : [], [debate])

  return (
    <Suspense fallback="Now Loading....">
      <ul className={classes.list}>
        {turns.map((turn: TTurn) => (
          <Turn
            key={turn.id}
            body={turn.body}
            createdAt={turn.createdAt}
            id={turn.id}
            isOpponent={turn.userSub === debate.opponentSub}>
          </Turn>
        ))}
      </ul>
    </Suspense>
  )
}
