'use client'

import Debate from '@/components/Debate/Debate'
import { useUser } from '@auth0/nextjs-auth0/client'
//import NewTurn from '@/components/Turn/NewTurn'
import { TDebate } from '@/lib/prisma-types'
import getDebateTurns from '@/actions/get-debate-turns'
import { useState, useCallback } from 'react'
import JoinDebate from '@/components/Invite/JoinDebate'
import Invite from '@/components/Invite/Invite'

interface IDebatePage {
  params: { slug: string }
}

export default function DebatePage({ params }: IDebatePage) {
  const debateId = parseInt(params.slug, 10)
  const { user, error, isLoading } = useUser()
  const [debateData, setDebateData] = useState<TDebate | null>(null)

  const updateDebateData = useCallback(() => {
    if (!user || !user.sub) {
      return
    }
    getDebateTurns(debateId, user.sub).then(d => setDebateData(d))
  }, [debateId, user])

  /*const isCooldownActive = useMemo(() => {
    if (!debateData) {
      return false
    }

    const lastTurn = debateData.turn?.at(-1)

    if (
      !debateData.turn ||
      !debateData.turn.length ||
      !lastTurn ||
      lastTurn.userSub === user?.sub
    ) {
      return false
    }

    return (
      Date.now() - new Date(lastTurn.createdAt).getTime() < (debateData.cooldownMins * 100_000)
    )
  }, [debateData, user?.sub])

  const isItYourTurn = useMemo(() => {
    if (!debateData || !user) {
      return false
    }

    const lastTurn = debateData.turn?.at(-1)

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
    if (!!user && !!user.sub) {
      updateDebateData()
    } else {
      // return <signin/register flow>
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
  }*/

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
    return <Debate debate={debateData} updateDebate={updateDebateData} />
  //return <Debate debateId={parseInt(params.slug, 10)} />
  /*return (
    <section>
        <>
          <h1>{debateData.topic}</h1>
          <Turns debate={debateData} />
          { renderNewTurn }
        </>
      </section>
    )*/
}
