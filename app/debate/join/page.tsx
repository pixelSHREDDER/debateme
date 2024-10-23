import getInviteDebateId from '@/actions/get-invite-debate-id'
import JoinDebate from '@/components/Invite/JoinDebate'

export default async function JoinDebatePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  let debateId: number
  if (!searchParams.id) {
    throw new Error('No invite ID specified')
  }
  try {
    debateId = await getInviteDebateId(searchParams.id)
  } catch (e: any) {
    throw new Error(e.message)
  }

  return <JoinDebate debateId={debateId} inviteId={searchParams.id} />
}
