import resolveUser from '@/actions/resolve-user'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(async ({ searchParams }) => {
  // TODO: MFA would likely live here
  const session = await getSession()
  const inviteId = searchParams?.id?.toString() || null
  const returnTo = !!inviteId ? `/debate/join?id=${inviteId}` : '/debate'

  if (!session || !session.user) {
    return <p>Please log in.</p>
  }

  await resolveUser(session.user.email, session.user.sub, returnTo)

  return <p>Loading, please wait....</p>
}, {
  returnTo({ searchParams }) {
    return `/verify?id=${searchParams?.id?.toString()}`
  }
})
