'use client'

import addTurn from '@/actions/add-turn'
import { TDebate } from '@/lib/prisma-types'
import { useFormState } from 'react-dom'
import { useRef, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Editor from '@/components/Editor/Editor'
import FormSubmitButton from '@/components/Forms/FormSubmitButton'
import FormAlert from '@/components/Forms/FormAlert'
import { Button, Fieldset, Flex, Modal, Stack, Text } from '@mantine/core'
import Quotes from '@/components/Quotes/Quotes'
import { useDisclosure } from '@mantine/hooks'
import useCustomMarks from '@/hooks/useCustomMarks'

const SUBMIT_WARNING = 'Remember: turns can\'t be edited, and you can\'t submit another turn until your opponent finishes theirs.'

const initialState = {
  message: '',
}

export default function NewTurn({ debate, onSubmit }: { debate: TDebate, onSubmit: Function }) {
  const [isProofread, setIsProofread] = useState<boolean>(false)
  const [state, formAction] = useFormState(addTurn, initialState)
  const bodyRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()
  const [opened, { open, close }] = useDisclosure(false)
  const { stripCustomMarks } = useCustomMarks()

  const onUpdate = (editorHtml?: string) => {
    if (!!editorHtml && bodyRef.current) bodyRef.current.value = stripCustomMarks(editorHtml)
  }

  const onProofread = () => { if (!isProofread) setIsProofread(true) }

  const onTurnSubmit = (payload: FormData) => {
    formAction(payload)
    if (onSubmit) {
      onSubmit()
    }
  }

  if (!user || !user.sub) {
    return ''
  }

  return (
    <form action={onTurnSubmit} id="new-turn-form" data-testid="new-turn-form">
      <Fieldset mt={30} mx={0} radius="lg" variant="filled" legend="It's your turn!">
        <input
          type="hidden"
          id="debateId"
          name="debateId"
          value={debate.id} />
        <input
          type="hidden"
          id="isCreator"
          name="isCreator"
          value={user.sub === debate.creatorSub ? 'true' : 'false'} />
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
        <Editor
          id="body"
          onProofread={onProofread}
          onUpdate={onUpdate}
          required="true"
          testid="new-turn-editor">
        </Editor>
        {state?.message &&
          <FormAlert
            message={state.message}
            title="Something went wrong"
            type={2} />
        }
        <Flex align="center" gap={20} justify="flex-start">
          <Quotes />
          {!!isProofread &&
            <Button flex="1 0 auto" onClick={open}>Finish Your Turn</Button>
          }
        </Flex>
      </Fieldset>
      <Modal opened={opened} onClose={close} centered title="All set?">
        <Stack>
          <Text>{SUBMIT_WARNING}</Text>
          <Flex gap="sm">
            <FormSubmitButton form="new-turn-form" label="I'm All Done" />
            <Button variant="outline" onClick={close}>Not Yet</Button>
          </Flex>
        </Stack>
      </Modal>
    </form>
  )
}
