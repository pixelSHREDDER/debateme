'use client'

import {
  Container,
  Title,
  Button,
  Group,
  Text,
  Overlay,
  Badge,
  Anchor,
} from '@mantine/core'
import React from 'react'
import classes from './HeroSection.module.css'
import { theme } from '@/theme'

export default function HeroSection() {
  return (
    <section className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              The debate-focused <span className={classes.highlight}>cure</span> for the common comment thread
            </Title>
            <Text c={theme.colors?.purple?.[2] || 'dark'} mt="md">
              Say goodbye to hot-take tweets, crowded comments, and chaotic social media posts. Start having real, meaningful, productive conversations about what you care about, with the people you care about.
            </Text>
            <Group mt={30} mb={30} justify="space-between">
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              {/*<Button variant="default" radius="xl" size="md" className={classes.control}>
                Learn more
              </Button>*/}
              <Badge variant="transparent" size="xs">Art by <Anchor<'a'> size="xs" href="https://unsplash.com/@kylejglenn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kyle Glenn</Anchor> | <Anchor<'a'> size="xs" href="https://unsplash.com/photos/books-over-green-trolley-bin-gcw_WWu_uBQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Anchor></Badge>
            </Group>
          </div>
        </div>
      </Container>
    </section>
  )
}
