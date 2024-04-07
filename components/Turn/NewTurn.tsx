'use client'

import { addTurn } from '@/actions/add-turn';
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

export default function NewTurn({ debateId }: { debateId: string }) {
  const [state, formAction] = useFormState(addTurn, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="body">Text</label>
      <input type="text" id="body" name="body" required />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
      <input
        type="text"
        id="debateId"
        name="debateId"
        aria-hidden
        required
        disabled
        value={debateId} />
      <button type="submit">Finish Your Turn</button>
    </form>
  )
}