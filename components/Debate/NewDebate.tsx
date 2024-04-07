'use client'

import { addDebate } from '@/actions/add-debate';
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

export default function NewDebate() {
  const [state, formAction] = useFormState(addDebate, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="topic">Topic</label>
      <input type="text" id="topic" name="topic" required />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
      <button type="submit">Start Debating!</button>
    </form>
  )
}