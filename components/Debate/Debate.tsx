'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'
import { useEffect, useMemo } from 'react'
import { theme } from '@/theme'
import { Alert, Skeleton } from '@mantine/core'
import Invite from '@/components/Invite/Invite'
import FormAlert from '@/components/Forms/FormAlert'
import useUserStatus from '@/hooks/useUserStatus'

interface IDebate {
  debate: TDebate | null,
  updateDebate: Function
}

export default function Debate({ debate, updateDebate }: IDebate) {
  const { user, error, isLoading } = useUser()
  const { isItYourCooldown, isItYourTurn } = useUserStatus()

  const renderNewTurn = useMemo(() => {
    if (!debate) { return }

    if (
      user?.sub &&
      isItYourCooldown(
        debate.creatorSub,
        debate.opponentSub,
        debate.status,
        user.sub,
      )
    ) {
      const lastTurn = debate.turn?.at(-1)
      const turnTime = (
        lastTurn ?
        `You can start your next turn at ${new Date(Date.now() - lastTurn.createdAt.getSeconds()).toLocaleTimeString()}. In the meantime, why not read over the previous turns? You never know what you might've missed!` :
        'But we don&apos;t know when your next turn will start. Try refreshing the page.'
      )
      return (
        <Alert
          id="alert_debate_cooldown"
          variant="light"
          color={theme.colors?.purple?.[6] || 'purple'}
          radius="lg"
          my={20}>
            The cooldown period is active. {turnTime}
        </Alert>
      )
    }

    if (
      user?.sub &&
      !isItYourTurn(
        debate.creatorSub,
        debate.opponentSub,
        debate.status,
        user.sub,
      )
    ) {
      return (
        <Alert
          id="alert_debate_opponents_turn"
          variant="light"
          color={theme.colors?.purple?.[6] || 'purple'}
          radius="lg"
          my={20}>
            It&apos;s your opponent&apos;s turn, please wait....
        </Alert>
      )
    }

    return <NewTurn debate={debate} onSubmit={updateDebate} />
  }, [debate, isItYourCooldown, isItYourTurn, updateDebate, user?.sub])

  useEffect(() => {
    if (isLoading) { return }

    if (!!user && !!user.sub) {
      updateDebate()
    } else {
      // TODO: redirect to signin/register flow
      console.log('no user')
    }
  }, [isLoading, updateDebate, user])

  if (isLoading) {
    return (
      <>
        <Skeleton width="auto" ml="3rem" height={300} radius="lg" />
        <Skeleton width="auto" mt="2em" mr="3rem" height={300} radius="lg" />
      </>
    )
  }

  if (error) {
    console.error(error)
    return (
      <FormAlert
        message={error.message || '....but we do not know what. Try reloading and check again.'}
        title="Something went wrong"
        type={2} />
    )
  }

  if (!user) {
    return (
      <FormAlert
        message="Try logging in again."
        title="Something went wrong"
        type={2} />
    )
  }

  if (!debate) {
    return (
      <FormAlert
        message="Sorry, we couldn't find that debate."
        title="Something went wrong"
        type={2} />
    )
  }

  if (debate.opponentSub === null) {
    return (debate.creatorSub === user.sub) ?
    <Invite debateId={debate.id} /> :
    <FormAlert
      message="You need to use the invite link to join this debate."
      title="Something went wrong"
      type={2} />
  }

  return (
    <section data-testid="debate-section">
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      { renderNewTurn }
    </section>
  )
}
