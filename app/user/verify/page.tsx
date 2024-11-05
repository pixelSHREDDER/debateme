import resolveUser from '@/actions/resolve-user'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(async () => {
  // TODO: MFA would likely live here
  const session = await getSession()

  if (!session || !session.user) {
    return <p>Please log in.</p>
  }

  await resolveUser(session.user.email, session.user.sub, '/debate')

  return <p>Loading, please wait....</p>
}, { returnTo: '/user/verify' })
