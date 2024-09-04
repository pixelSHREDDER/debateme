/* eslint-disable max-len */

'use client'

import getInviteId from '@/actions/get-invite-id'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useCallback, useEffect, useState } from 'react'

export default function Invite({ debateId }: { debateId: number }) {
  const { user, error, isLoading } = useUser()
  const [inviteLink, setInviteLink] = useState('')

  const getInviteLink = useCallback(async () => {
    try {
      const inviteId = await getInviteId(debateId)
      setInviteLink(`/join?id=${inviteId}`)
    } catch (e: any) { return e }
  }, [debateId])

  useEffect(() => {
    if (!user || !user.sub) {
      return
    }
    getInviteLink()
  }, [getInviteLink, user])

  if (isLoading) { return 'loading user...' }
  if (error) { return JSON.stringify(error) }
  if (!user || !user.sub) { return 'please login' }
  if (!debateId) { return 'Debate not found' }

  return (
    <section data-testid="invite-section">
      <h2>Invite Your Opponent to Join this Debate</h2>
      <p>Share the link below with your opponent, so they can join and start the debate! NOTE: Invite link will expire after use.</p>
      { inviteLink.length ?
        <input
          type="text"
          id="inviteId"
          name="inviteId"
          value={inviteLink} /> :
        'loading invite link....'
      }
    </section>
  )
}
