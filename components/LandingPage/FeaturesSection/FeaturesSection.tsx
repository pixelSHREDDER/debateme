'use client'

import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core'
import { IconHeartHandshake, IconPodium, IconBubble } from '@tabler/icons-react'
import React from 'react'
import { theme } from '@/theme'
import classes from './FeaturesSection.module.css'

const mockdata = [
  {
    title: 'Tackle the issue, not each other',
    description:
      'Designed from the ground up to encourage meaningful discourse, not shallow engagement. Featuring cooldown timers between turns, control over who can see your debate, and more.',
    icon: IconHeartHandshake,
  },
  {
    title: 'Get to the heart of the matter',
    description:
      'Use robust typing tools built to facilitate long-form conversations: quoting, lists, preview-free links, and more.',
    icon: IconBubble,
  },
  {
    title: 'Improve your debating & critical thinking',
    description:
      'Debate Coaching scans for logical fallacies and other common pitfalls, to help you create sound arguments and keep the conversation productive.',
    icon: IconPodium,
  },
]

export default function FeaturesSection() {
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme?.colors?.purple?.[3]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))

  return (
    <Container component="section" size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          A new approach
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Why Debate.me?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {/*eslint-disable-next-line max-len*/}
        Most platforms we use to converse over the internet prioritize engagement above all else. This results in short-form, surface-level conversations at best, and completely toxic discourse at worst. Debate.me does things differently.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  )
}
