import getInviteDebateId from '@/actions/get-invite-debate-id'
import JoinDebate from '@/components/Invite/JoinDebate'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(async ({ searchParams }) => {
  const inviteId = searchParams?.id?.toString() || null
  let debateId: number

  if (!inviteId) {
    throw new Error('No invite ID specified')
  }
  try {
    debateId = await getInviteDebateId(inviteId)
  } catch (e: any) {
    throw new Error(e.message)
  }

  return <JoinDebate debateId={debateId} inviteId={inviteId} />
}, {
  returnTo({ searchParams }) {
    return `/debate/join?id=${searchParams?.id?.toString()}`
  }
})
