'use client'

import cx from 'clsx'
import { Card } from '@mantine/core'
import { Prisma } from '@prisma/client'
import { Content } from '@tiptap/react'
import classes from './Turn.module.css'
import ReadOnlyEditor from '../Editor/ReadOnlyEditor'

interface ITurn {
  body: Prisma.JsonValue | null,
  createdAt: Date,
  id: number,
  isOpponent: boolean,
}

export default function Turn(turn: ITurn) {
  return (
    <Card component="li" className={cx(classes.card, { [classes.opponentCard]: turn.isOpponent })} radius="lg">
      <ReadOnlyEditor content={turn.body as Content || ''} id={`turn-${turn.id}`} testid={`turn-${turn.id}-editor`}></ReadOnlyEditor>
    </Card>
  )
}
