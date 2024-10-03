'use client'

import addDebate from '@/actions/add-debate'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useFormState } from 'react-dom'
import { Fieldset, Flex, NativeSelect, TextInput } from '@mantine/core'
import FormSubmitButton from '../Forms/FormSubmitButton'
import FormAlert from '../Forms/FormAlert'
import Quotes from '../Quotes/Quotes'

const initialState = {
  message: '',
}

export default function NewDebate() {
  const [state, formAction] = useFormState(addDebate, initialState)
  const { user } = useUser()

  return user && user.sub ?
    <form action={formAction} data-testid="new-debate-form">
      <Fieldset mx={0} radius="lg" variant="filled">
        <TextInput
          type="hidden"
          id="creatorSub"
          name="creatorSub"
          value={user.sub} />
        <TextInput
          type="text"
          label="Topic"
          id="topic"
          name="topic"
          mb={16}
          required
          withAsterisk />
        <NativeSelect
          label="Cooldown period between turns"
          id="cooldownMins"
          name="cooldownMins"
          defaultValue="5"
          maw="max(50%, 200px)"
          mb={16}
          required>
          <option value="180">3 hours</option>
          <option value="120">2 hours</option>
          <option value="60">1 hour</option>
          <option value="10">10 minutes</option>
          <option value="5">5 minutes</option>
          <option value="1">1 minute</option>
          <option value="0">No cooldown</option>
        </NativeSelect>
        {state?.message &&
          <FormAlert
            message={state.message}
            title="Something went wrong"
            type={2} />
        }
        <Flex align="center" gap={20} justify="flex-start">
          <Quotes />
          <FormSubmitButton label="Start Debating!" />
        </Flex>
      </Fieldset>
    </form> :
  'login'
}
