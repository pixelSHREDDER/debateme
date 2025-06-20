'use client'

import cx from 'clsx'
import {
  AppShell as MantineAppShell,
  Burger,
  Group,
  Anchor,
  Stack,
  Image,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import classes from '@/components/AppShell/AppShell.module.css'

const links = [
  { link: '/', label: 'Home', logOutHide: false },
  { link: '/debate', label: 'Debates', logOutHide: true },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { error, isLoading, user } = useUser()
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const visibleLinks = user ? links : links.filter(link => !link.logOutHide)

  const items = (isHeader: boolean) => visibleLinks.map((link) => (
    <Anchor<'a'>
      href={link.link}
      key={link.label}
      className={cx(classes.link, { [classes.headerLink]: !!isHeader })}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}
    >
      {link.label}
    </Anchor>
  ))

  const userChunk = () => {
    if (isLoading) return 'loading user....'
    if (error) return 'error'
    if (user) {
      return (
        <>
          {/*<Anchor
            component="a"
            href="/user/profile"
            className={classes.user}>*/}
            Hi, {user.name}!
          {/*</Anchor>*/}
          <Anchor
            component="a"
            href="/api/auth/logout"
            className={classes.link}>
            Log Out
          </Anchor>
        </>
      )
    }
    return (
      <Anchor
        component="a"
        href="/api/auth/login"
        className={classes.link}>
        Log In
      </Anchor>
    )
  }

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding={pathname === '/' ? 0 : 'md'}
    >
      <MantineAppShell.Header className={classes.header}>
        <Group h="100%" justify="space-between" w="100%" px="md" className={classes.container}>
          <Image
            height={28}
            src="/debate-me-wordmark.svg"
            alt="Debate.me wordmark" />
          <Group gap={5} visibleFrom="sm">
            {!user && items(true)}
          </Group>
          <Group justify="right" visibleFrom="sm">
            <ColorSchemeToggle />
            {userChunk()}
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar py="md" px={8}>
        <MantineAppShell.Section grow>
          <Stack gap={20}>
            {items(false)}
          </Stack>
        </MantineAppShell.Section>
        <MantineAppShell.Section>
          <Group align="end" justify="space-between">
            <ColorSchemeToggle />
            {userChunk()}
          </Group>
        </MantineAppShell.Section>
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>
        {children}
      </MantineAppShell.Main>
    </MantineAppShell>
  )
}
