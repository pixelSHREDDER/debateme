/* eslint-disable max-len */

'use client'

import {
  Container,
  Title,
  Button,
  Text,
  Overlay,
  Badge,
  Anchor,
  Flex,
} from '@mantine/core'
import React from 'react'
import { theme } from '@/theme'
import classes from '@/components/LandingPage/HeroSection/HeroSection.module.css'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function HeroSection() {
  const { user } = useUser()
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
              Say goodbye to crowded comments, mean tweets, and social media hot takes. Start having real, meaningful, productive conversations about what you care about, with the people you care about.
            </Text>
            <Flex mt={30} mb={30} justify="space-between" gap="sm" className={classes.controls}>
              <Button
                component="a"
                href={user ? '/debate' : '/api/auth/login'}
                radius="xl"
                size="md"
                className={classes.control}>
                Get started
              </Button>
              {/*<Button variant="default" radius="xl" size="md" className={classes.control}>
                Learn more
              </Button>*/}
              <Badge variant="transparent" size="xs">Art by <Anchor<'a'> size="xs" href="https://unsplash.com/@kylejglenn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kyle Glenn</Anchor> | <Anchor<'a'> size="xs" href="https://unsplash.com/photos/books-over-green-trolley-bin-gcw_WWu_uBQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Anchor></Badge>
            </Flex>
          </div>
        </div>
      </Container>
    </section>
  )
}
