/* eslint-disable max-len */

'use client'

import getInviteId from '@/actions/get-invite-id'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Alert, Button, CopyButton, Group, Skeleton, TextInput } from '@mantine/core'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { theme } from '@/theme'
import FormAlert from '@/components/Forms/FormAlert'
import addInvite from '@/actions/add-invite'

export default function Invite({ debateId }: { debateId: number }) {
  const { user, error, isLoading } = useUser()
  const [inviteLink, setInviteLink] = useState('')
  const [inviteLinkError, setInviteLinkError] = useState<Error | null>(null)

  const getInviteLink = useCallback(async () => {
    try {
      const inviteId = await getInviteId(debateId)
      setInviteLink(`${process.env.NEXT_PUBLIC_SITE_URL}/debate/join?id=${inviteId}`)
    } catch (e: any) { setInviteLinkError(e) }
  }, [debateId])

  const regenerateInviteLink = useCallback(async () => {
    try {
      await addInvite(debateId)
      const inviteId = await getInviteId(debateId)
      setInviteLinkError(null)
      setInviteLink(`${process.env.NEXT_PUBLIC_SITE_URL}/debate/join?id=${inviteId}`)
    } catch (e: any) { setInviteLinkError(e) }
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
          message={
            error?.message ||
            '....but we do not know what. Try reloading and check again.'
          }
          title="Something went wrong"
          type={2} />
      </>
    )
  }

  if (inviteLinkError) {
    switch (inviteLinkError.message) {
      case 'Failed to find invite by id: No Invite found':
        return (
          <>
            <h2>Invite Your Opponent to Join this Debate</h2>
            <FormAlert
              message="Try getting a new one."
              title="The invite link to this debate isn&apos;t working"
              type={2} />
              <Button onClick={regenerateInviteLink}>Get new invite link</Button>
          </>
        )
      default:
        return (
          <>
            <h2>Invite Your Opponent to Join this Debate</h2>
            <FormAlert
              message="....but we do not know what. Try reloading and check again."
              title="Something went wrong"
              type={2} />
          </>
        )
    }
  }

  return (
    <section data-testid="invite-section">
      <h2>Invite Your Opponent to Join this Debate</h2>
      <Skeleton mb={6} visible={isLoading || !user || !user.sub}>
        <p>Share the link below with your opponent, so they can join and start the debate!</p>
      </Skeleton>
      <Skeleton mb={6} height="55" visible={isLoading || !user || !user.sub}>
        <Alert
          id="alert_invite_link"
          variant="light"
          color={theme.colors?.purple?.[6] || 'purple'}
          radius="lg"
          my={20}>
            Remember, this invite link will expire after being used once.
        </Alert>
      </Skeleton>
      {!!debateId && inviteLink.length ?
        <Group>
          <TextInput
            flex={1}
            aria-label="Invite link"
            readOnly
            value={inviteLink} />
          <CopyButton value={inviteLink}>
            {(
              {
                copied,
                copy,
              }: {
                copied: boolean,
                copy: MouseEventHandler<HTMLButtonElement> | undefined
              }
            ) => (
              <Button color={copied ? 'teal' : theme.primaryColor} onClick={copy}>
                {copied ? 'Link copied' : 'Copy link'}
              </Button>
            )}
          </CopyButton>
        </Group> :
        <Skeleton height={36} radius="sm" />
      }
    </section>
  )
}
