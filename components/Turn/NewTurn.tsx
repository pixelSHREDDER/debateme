'use client'

import { addTurn } from '@/actions/add-turn';
import { TDebate } from '@/lib/prisma-types'
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

export default function NewTurn({ debate }: { debate: TDebate }) {
  const [state, formAction] = useFormState(addTurn, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="body">Text</label>
      <input type="text" id="body" name="body" required />
      <p aria-live="polite">
        {state?.message}
      </p>
      <input
        type="hidden"
        id="debateId"
        name="debateId"
        value={debate.id} />
      <button type="submit">Finish Your Turn</button>
    </form>
  )
}