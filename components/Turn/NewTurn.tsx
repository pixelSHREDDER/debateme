'use client'

import { addTurn } from '@/actions/add-turn';
import { Debate } from '@prisma/client';
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

export default function NewTurn({ debate }: { debate: Debate }) {
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
        value={debate.id} />
      <button type="submit">Finish Your Turn</button>
    </form>
  )
}