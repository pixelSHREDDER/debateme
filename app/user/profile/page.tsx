import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Image from 'next/image'

export default withPageAuthRequired(async () => {
  const session = await getSession()

  return (
      session?.user ? (
          <div>
            <Image src={session.user.picture} alt={session.user.name} width={60} height={60} />
            <h2>{session.user.name}</h2>
            <p>{session.user.email}</p>
          </div>
      ) : <>Please login</>
  )
}, { returnTo: '/user/profile' })
