import NewDebate from '@/components/Debate/NewDebate'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

/*export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)
  const email = session?.user?.email
	let user = null
  if (email) {
    try {
      user = await prisma.user.findUnique({
        where: { email: String(email) }
      });

      if (!user) notFound()
    } catch (error: any) {
      throw error
    }
  }

  return {
    props: {
			user
    },
  }
}*/

export default withPageAuthRequired(async function Debates(/*{ user }: { user: User }*/) {
  /*const session = await getSession()
  const userId = parseInt(session?.user.sid)
  console.table(session.user)*/

  const session = await getSession()
  const email = session?.user?.email
	let user = null
  if (email) {
    try {
      user = await prisma.user.findUnique({
        where: { email: String(email) }
      });
    } catch (error: any) {
      throw error
    }
  }

  return (
    <>
      <h1>Debates</h1>
      { !!user ?
        <NewDebate creatorId={user.id} /> :
        'Please log in'
      }
    </>
  )
})