'use client'

import { Button } from '@mantine/core'
import { useFormStatus } from 'react-dom'

export default function FormSubmitButton({ form, label }: { form: string, label: string }) {
  const { pending } = useFormStatus()

  return (
    <Button style={{ flexShrink: 0 }} type="submit" form={form} disabled={pending} radius="md" variant="filled">
      {label || 'Submit'}
    </Button>
  )
}
