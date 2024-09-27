'use client'

import addTurn from '@/actions/add-turn'
import { TDebate } from '@/lib/prisma-types'
import { useFormState } from 'react-dom'
import { useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Editor from '@/components/Editor/Editor'
import FormSubmitButton from '@/components/Forms/FormSubmitButton'
import FormAlert from '@/components/Forms/FormAlert'
import { Fieldset, Flex/*, InputLabel*/ } from '@mantine/core'
import Quotes from '@/components/Quotes/Quotes'

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

  if (!user || !user.sub) {
    return ''
  }

  return (
    <form action={onTurnSubmit} data-testid="new-turn-form">
      <Fieldset mt={20} mx={0} radius="lg" variant="filled" legend="It's your turn!">
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
        {/*<InputLabel htmlFor="body">New turn text</InputLabel>*/}
        <Editor id="body" onUpdate={onUpdate} required="true" testid="new-turn-editor"></Editor>
        {state?.message &&
          <FormAlert
            message={state.message}
            title="Something went wrong"
            type={2} />
        }
        <Flex align="center" gap={20} justify="flex-start">
          <Quotes />
          <FormSubmitButton label="Finish Your Turn" />
        </Flex>
      </Fieldset>
    </form>
  )
}
