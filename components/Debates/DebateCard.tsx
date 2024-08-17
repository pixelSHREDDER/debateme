//'use client'

import cx from 'clsx'
//import getUserDebates from '@/actions/get-user-debates'
//import { TUserDebates } from '@/lib/prisma-types'
//import { useUser } from '@auth0/nextjs-auth0/client'
//import { Debate } from '@prisma/client'
import Link from 'next/link'
//import React, { useEffect, useState } from 'react'
import { Card, Avatar, Text, Badge, Group, ActionIcon } from '@mantine/core'
//import { MantineLogo } from '@mantinex/mantine-logo'
import { IconPencil, IconUserPlus } from '@tabler/icons-react'
import marble from '@/app/marble.module.css'
import classes from './DebateCard.module.css'

const avatars = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
]

interface IDebateCard {
  creatorSub?: string,
  id: number,
  opponentSub: string | null,
  topic: string
}

export default function DebateCard({ creatorSub, id, opponentSub, topic }: IDebateCard) {
  return (
    <Card className={cx(classes.card, marble.marble)} radius="sm">
      <Card.Section p="lg" pb="">
        <Group justify="space-between">
          {/*<MantineLogo type="mark" size="2rem" />*/}
          <Badge>It&apos;s your turn!</Badge>
        </Group>

        <Link className={classes.link} href={`/debate/${id}`}>
          <Text fz="xl" fw={500} mt="md">{topic}</Text>
        </Link>
        {/*<Text fz="sm" c="dimmed" mt={5}>
          Form context management, Switch, Grid and Indicator components improvements, new hook and
          10+ other changes
        </Text>*/}
        {/*<Text c="dimmed" fz="sm" mt="md">
          Tasks completed:{' '}
          <Text span fw={500} c="bright">
            23/36
          </Text>
        </Text>
        <Progress value={(23 / 36) * 100} mt={5} />*/}
      </Card.Section>
      <Card.Section p="lg" pt="">
        <Group justify="space-between" mt="md">
          <Avatar.Group spacing="xs">
            <Avatar src={avatars[0]} radius="xl" />
            {opponentSub ?
              <Avatar src={avatars[1]} radius="xl" /> :
              <Avatar src="" radius="xl" />
            }
          </Avatar.Group>
          <ActionIcon variant="default" size="lg" radius="md">
            {!!opponentSub ?
              <IconPencil size="1.1rem" /> :
              <IconUserPlus size="1.1rem" />
            }
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  )
}
