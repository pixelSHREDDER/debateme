'use client'

import { addTurn } from '@/actions/add-turn';
import { TDebate } from '@/lib/prisma-types'
import { useFormState } from 'react-dom'
import Editor from '../Editor/Editor';
import { useRef } from 'react';

const initialState = {
  message: '',
}

export default function NewTurn({ debate }: { debate: TDebate }) {
  const [state, formAction] = useFormState(addTurn, initialState)
  const bodyRef = useRef<HTMLInputElement>(null)

const onUpdate = (newBody: string) => {
  if (bodyRef.current) bodyRef.current.value = newBody
}

  return (
    <form action={formAction}>
      <input
        type="hidden"
        id="debateId"
        name="debateId"
        value={debate.id} />
      <input
        ref={bodyRef}
        type="hidden"
        id="bodyString"
        name="bodyString" />
      <label htmlFor="body">Text</label>
      <Editor id="body" onUpdate={onUpdate} required="true"></Editor>
      <p aria-live="polite">
        {state?.message}
      </p>
      <button type="submit">Finish Your Turn</button>
    </form>
  )
}