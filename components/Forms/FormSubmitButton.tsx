'use client'

import { Button } from '@mantine/core'
import { useFormStatus } from 'react-dom'

export default function FormSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

  return (
    <Button style={{ flexShrink: 0 }} type="submit" disabled={pending} radius="md" variant="filled">
      {label || 'Submit'}
    </Button>
  )
}
