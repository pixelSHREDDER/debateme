/* eslint-disable max-len */

'use client'

import getInviteId from '@/actions/get-invite-id'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Alert, Skeleton, TextInput } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { theme } from '@/theme'
import FormAlert from '../Forms/FormAlert'

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

  if (error) {
    return (
      <>
        <h2>Invite Your Opponent to Join this Debate</h2>
        <FormAlert
          message={error.message || '....but we do not know what. Try reloading and check again.'}
          title="Something went wrong"
          type={2} />
      </>
    )
  }

  return (
    <section data-testid="invite-section">
      <h2>Invite Your Opponent to Join this Debate</h2>
      <Skeleton mb={6} visible={isLoading || !user || !user.sub}>
        <p>Share the link below with your opponent, so they can join and start the debate!</p>
      </Skeleton>
      <Skeleton mb={6} height="55" visible={isLoading || !user || !user.sub}>
        <Alert
          variant="light"
          color={theme.colors?.purple?.[6] || 'purple'}
          radius="lg"
          my={20}>
            Remember, this invite link will expire after being used once.
        </Alert>
      </Skeleton>
      {!!debateId && inviteLink.length ?
        <TextInput
          aria-label="Invite link"
          readOnly
          value={inviteLink} /> :
        <Skeleton height={36} radius="sm" />
      }
    </section>
  )
}
