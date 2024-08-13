'use client'

import { useFormStatus } from 'react-dom'

export default function FormSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {label || 'Submit'}
    </button>
  )
}
