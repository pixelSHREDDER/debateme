'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import Turns from '@/components/Turn/Turns'
import getDebateTurns from '@/actions/get-debate-turns'
import { useState, useEffect, useMemo, useCallback } from 'react'
import JoinDebate from '../Invite/JoinDebate'
import Invite from '../Invite/Invite'

export default function Debate({ debateId }: { debateId: number }) {
  const { user, error, isLoading } = useUser()
  const [debateData, setDebateData] = useState<TDebate | null>(null)

  const updateDebateData = useCallback(() => {
    if (!user || !user.sub ) {
      return
    }
    getDebateTurns(debateId, user.sub).then(d => setDebateData(d))
  }, [debateId, user])

  const isCooldownActive = useMemo(() => {
    if (!debateData) {
      return false
    }

    let lastTurn = debateData.turn?.at(-1)

    if (!debateData.turn || !debateData.turn.length || !lastTurn || lastTurn.userSub === user?.sub) {
      return false
    }

    return (Date.now() - new Date(lastTurn.createdAt).getTime() < (debateData.cooldownMins * 100_000))
  }, [debateData, user?.sub])

  const isItYourTurn = useMemo(() => {
    if (!debateData || !user) {
      return false
    }

    let lastTurn = debateData.turn?.at(-1)

    if (!debateData.turn || !debateData.turn.length || !lastTurn) {
      return debateData.creatorSub === user.sub
    }

    return (lastTurn.userSub !== user.sub)
  }, [debateData, user])

  const renderNewTurn = useMemo(() => {
    if (!debateData) { return }
    if (isCooldownActive) { return 'wait for cooldown' }
    if (!isItYourTurn) { return 'wait for your opponent' }

    return <NewTurn debate={debateData} onSubmit={updateDebateData} />
  }, [debateData, isCooldownActive, isItYourTurn, updateDebateData])

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (!!user && !!user.sub ) {
      updateDebateData()
    } else {
      // return <signin/register flow>
      console.log('no user')
    }
  }, [debateId, isLoading, updateDebateData, user])

  if (isLoading) { return 'loading user...' }
  if (error) { return JSON.stringify(error) }
  if (!user) { return 'please login' }
  if (!debateData) { return 'Debate not found' }
  if (!debateData.opponentSub && (debateData.creatorSub === user.sub)) {
    return <Invite debateId={debateId} />
  }
  if (!debateData.opponentSub) {
    return <JoinDebate debateId={debateId} />
  }

  return (
      <section>
        <>
          <h1>{debateData.topic}</h1>
          <Turns debate={debateData} />
          { renderNewTurn }
        </>
      </section>
    )
}