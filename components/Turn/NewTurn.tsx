'use client'

import addTurn from '@/actions/add-turn'
import { TDebate } from '@/lib/prisma-types'
import { useFormState } from 'react-dom'
import { useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Editor from '../Editor/Editor'
import FormSubmitButton from '../Forms/FormSubmitButton'

const initialState = {
  message: '',
}

export default function NewTurn({ debate, onSubmit }: { debate: TDebate, onSubmit: Function }) {
  const [state, formAction] = useFormState(addTurn, initialState)
  const bodyRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()

const onUpdate = (newBody: string) => {
  if (bodyRef.current) bodyRef.current.value = newBody
}

const onTurnSubmit = async (payload: FormData) => {
  await formAction(payload)
  if (onSubmit) {
    onSubmit()
  }
}

return user && user.sub ?
    <form action={onTurnSubmit}>
      <input
        type="hidden"
        id="debateId"
        name="debateId"
        value={debate.id} />
      <input
        type="hidden"
        id="userSub"
        name="userSub"
        value={user.sub} />
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
      <FormSubmitButton label="Finish Your Turn" />
    </form> :
  'login'
}
