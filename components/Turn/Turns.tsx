'use client'

import { Debate, Turn } from "@prisma/client"
//import React, { Suspense } from "react"

export default function Turns(props: {debate: Debate}) {
  /*const turns = React.useMemo(() => {
    !!props.debate.turn ? JSON.parse(props.debate.turn) : []
  }, [props.debate])

  return (
    <Suspense>
      {turns.map((turn: Turn) => <li>{turn.body}</li>)}
    </Suspense>
  )*/
  return null
}