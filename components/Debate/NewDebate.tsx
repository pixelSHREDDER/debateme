'use client'

import { addDebate } from '@/actions/add-debate'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useFormState } from 'react-dom'
import FormSubmitButton from '../Forms/FormSubmitButton'

const initialState = {
  message: '',
}

export default function NewDebate() {
  const [state, formAction] = useFormState(addDebate, initialState)
  const { user } = useUser()

  return user && user.sub ?
    <form action={formAction}>
      <input
        type="hidden"
        id="creatorSub"
        name="creatorSub"
        value={user.sub} />
      <label htmlFor="topic">Topic</label>
      <input type="text" id="topic" name="topic" required />
      <p aria-live="polite">
        {state?.message}
      </p>
      <FormSubmitButton label='Start Debating!' />
    </form> :
  'login'
}