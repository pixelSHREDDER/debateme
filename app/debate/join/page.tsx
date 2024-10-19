'use client'

import getInviteDebateId from '@/actions/get-invite-debate-id'
import removeInvite from '@/actions/remove-invite'
import { redirect, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function JoinDebatePage() {
  const searchParams = useSearchParams()

  const redirectToInviteUrl = useCallback(async (inviteId: string) => {
    if (inviteId === null) { return }

    try {
      const debateId = await getInviteDebateId(inviteId)
      await removeInvite(inviteId)
      redirect(`/debate/${debateId}`)
    } catch (e: any) {
      throw new Error(e.message)
    }
  }, [])

  useEffect(() => {
    const inviteId = searchParams.get('id')
    if (inviteId) redirectToInviteUrl(inviteId)
  }, [redirectToInviteUrl, searchParams])
}
