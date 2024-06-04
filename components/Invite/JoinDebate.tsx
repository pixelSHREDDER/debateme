'use client'

import joinDebate from '@/actions/join-debate'
import FormSubmitButton from '../Forms/FormSubmitButton'
import { useFormState } from 'react-dom'
import { useUser } from '@auth0/nextjs-auth0/client'

const initialState = {
  message: '',
}

export default function JoinDebate({ debateId }: { debateId: number }) {
  const { user, error, isLoading } = useUser()
  const [ state, formAction ] = useFormState(joinDebate, initialState)

  if (isLoading) { return 'loading user...' }
  if (error) { return JSON.stringify(error) }
  if (!user || !user.sub) { return 'please login' }
  if (!debateId) { return 'Debate not found' }

  return (
      <section>
          <h2>Join this Debate</h2>
          <p>You have been invited to join this debate. Click below to join.</p>
          <form action={formAction}>
          <input
              type="hidden"
              id="debateId"
              name="debateId"
              value={debateId} />
            <input
              type="hidden"
              id="opponentSub"
              name="opponentSub"
              value={user.sub} />
            <p aria-live="polite">
              {state?.message}
            </p>
            <FormSubmitButton label='Join' />
          </form>
      </section>
    )
}