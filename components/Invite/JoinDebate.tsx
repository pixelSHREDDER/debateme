'use client'

import joinDebate from '@/actions/join-debate'
import { useFormState } from 'react-dom'
import { useUser } from '@auth0/nextjs-auth0/client'
import FormSubmitButton from '../Forms/FormSubmitButton'

const initialState = {
  message: '',
}

export default function JoinDebate({ debateId }: { debateId: number }) {
  const { user, error, isLoading } = useUser()
  const [state, formAction] = useFormState(joinDebate, initialState)

  if (isLoading) { return 'loading user...' }
  if (error) { return JSON.stringify(error) }
  if (!user || !user.sub) { return 'please login' }
  if (!debateId) { return 'Debate not found' }

  return (
      <section data-testid="join-section">
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
            <FormSubmitButton label="Join" />
          </form>
      </section>
    )
}
