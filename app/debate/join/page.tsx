'use client'

import getInviteDebateId from "@/actions/get-invite-debate-id"
import removeInvite from "@/actions/remove-invite"
import { redirect, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

export default function JoinDebatePage() {
  const searchParams = useSearchParams()
  const inviteId = searchParams.get('id')
  const redirectToInviteUrl = useCallback(async () => {
    if (inviteId === null) { return }

    try {
      const debateId = await getInviteDebateId(inviteId)
      await removeInvite(inviteId)
      redirect(`/debate/${debateId}`)
    } catch (e: any) {
      return e
    }
  }, [inviteId])

  useEffect(() => { if (!!inviteId) { redirectToInviteUrl } }, [inviteId, redirectToInviteUrl])
}