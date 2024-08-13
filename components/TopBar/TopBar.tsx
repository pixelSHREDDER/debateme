'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Container, Group, Burger, Anchor } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import classes from './TopBar.module.css'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'

const links = [
  { link: '/', label: 'Home' },
  { link: '/debate', label: 'Debates' },
]

export default function TopBar() {
  const { error, isLoading, user } = useUser()
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <Anchor<'a'>
      href={link.link}
      key={link.label}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
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
      <Anchor<'a'> href="/user/profile">Hi, {user.name}!</Anchor>&nbsp;|&nbsp;<a href="/api/auth/logout">Logout</a>
    </>
  )
}
  return <Anchor<'a'> href="/api/auth/login">Login</Anchor>
}

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/*<MantineLogo size={28} />*/}
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
      <Group justify="right" visibleFrom="xs">
        <ColorSchemeToggle />
        {userChunk()}
      </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
