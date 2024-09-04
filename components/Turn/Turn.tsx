'use client'

import cx from 'clsx'
import { Card } from '@mantine/core'
import classes from './Turn.module.css'

interface ITurn {
  children: React.ReactNode,
  createdAt: Date,
  isOpponent: boolean,
}

export default function Turn(turn: ITurn) {
  return (
    <Card component="li" className={cx(classes.card, { [classes.opponentCard]: turn.isOpponent })} radius="lg">
      {turn.children}
    </Card>
  )
}
