'use client'

import addDebate from '@/actions/add-debate'
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
      <label htmlFor="cooldownMins">Cooldown period between turns</label>
      <select id="cooldownMins" name="cooldownMins" defaultValue="60" required>
        <option value="180">3 hours</option>
        <option value="120">2 hours</option>
        <option value="60">1 hour</option>
        <option value="10">10 minutes</option>
        <option value="1">1 minute</option>
        <option value="0">No cooldown</option>
      </select>
      <p aria-live="polite">
        {state?.message}
      </p>
      <FormSubmitButton label="Start Debating!" />
    </form> :
  'login'
}
