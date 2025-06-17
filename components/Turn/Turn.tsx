'use client'

import { useRef } from 'react'
import cx from 'clsx'
import { Card, Group, ActionIcon } from '@mantine/core'
import { Prisma } from '@prisma/client'
import { Content } from '@tiptap/react'
import { IconWhirl } from '@tabler/icons-react'
import classes from './Turn.module.css'
import ReadOnlyEditor, { ReadOnlyEditorRef } from '../Editor/ReadOnlyEditor'

interface ITurn {
  body: Prisma.JsonValue | null,
  createdAt: Date,
  id: number,
  isOpponent: boolean,
}

export default function Turn(turn: ITurn) {
  const readOnlyEditorRef = useRef<ReadOnlyEditorRef>(null)

  const handleAskCoachClick = () => readOnlyEditorRef.current?.triggerCoach()

  const cardComponent = (
    <Card
      className={cx(classes.card, { [classes.opponentCard]: turn.isOpponent })}
      radius="lg"
    >
      <ReadOnlyEditor
        ref={readOnlyEditorRef}
        content={turn.body as Content || ''}
        id={`turn-${turn.id}`}
        testid={`turn-${turn.id}-editor`}
      />
    </Card>
  )

  const askCoachIcon = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={handleAskCoachClick}
      aria-label="Ask Coach"
    >
      <IconWhirl size={24} />
    </ActionIcon>
  )

  return (
    <Group
      component="li"
      gap="sm"
      align="center"
      preventGrowOverflow={false}
      style={{ justifyContent: turn.isOpponent ? 'flex-start' : 'flex-end', width: '100%' }}
    >
      {turn.isOpponent ? (
        <>
          {cardComponent}
          {askCoachIcon}
        </>
      ) : (
        <>
          {askCoachIcon}
          {cardComponent}
        </>
      )}
    </Group>
  )
}
