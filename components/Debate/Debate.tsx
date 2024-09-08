'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'
import { useMemo } from 'react'
import JoinDebate from '../Invite/JoinDebate'
import Invite from '../Invite/Invite'

interface IDebate {
  debate: TDebate | null,
  updateDebate: Function
}

export default function Debate({ debate, updateDebate }: IDebate) {
  const { user, error, isLoading } = useUser()

  const isCooldownActive = useMemo(() => {
    if (!debate) {
      return false
    }

    const lastTurn = debate.turn?.at(-1)

    if (
      !debate.turn ||
      !debate.turn.length ||
      !lastTurn ||
      lastTurn.userSub === user?.sub
    ) {
      return false
    }

    return (
      Date.now() - new Date(lastTurn.createdAt).getTime() < (debate.cooldownMins * 100_000)
    )
  }, [debate, user?.sub])

  const isItYourTurn = useMemo(() => {
    if (!debate || !user) {
      return false
    }

    const lastTurn = debate.turn?.at(-1)

    if (!debate.turn || !debate.turn.length || !lastTurn) {
      return debate.creatorSub === user.sub
    }

    return (lastTurn.userSub !== user.sub)
  }, [debate, user])

  const renderNewTurn = useMemo(() => {
    if (!debate) { return }
    if (isCooldownActive) { return 'wait for cooldown' }
    if (!isItYourTurn) { return 'wait for your opponent' }

    return <NewTurn debate={debate} onSubmit={updateDebate} />
  }, [debate, isCooldownActive, isItYourTurn, updateDebate])

  /*useEffect(() => {
    if (isLoading) {
      return
    }
    if (!!user && !!user.sub) {
      updateDebate()
    } else {
      // return <signin/register flow>
      //console.log('no user')
    }
  }, [isLoading, updateDebate, user])*/

  if (isLoading) { return 'loading....' }
  if (error) {
    console.error(error)
    return 'error'
  }
  if (!user) { return 'user not found' }
  if (!debate) { return 'debate not found' }
  /*if (isLoading) { return 'loading user...' }
  if (error) { return JSON.stringify(error) }
  if (!user) { return 'please login' }
  if (!debate) { return 'Debate not found' }*/
  /*if (!debate.opponentSub && (debate.creatorSub === user.sub)) {
    return <Invite debateId={debate.id} />
  }
  if (!debate.opponentSub) {
    return <JoinDebate debateId={debate.id} />
  }*/

  if (debate.opponentSub === null) {
    return (debate.creatorSub === user.sub) ?
    <Invite debateId={debate.id} /> :
    <JoinDebate debateId={debate.id} />
  }

  return (
    <section data-testid="debate-section">
      <h1>{debate.topic}</h1>
      <Turns debate={debate} />
      { renderNewTurn }
    </section>
  )
}
