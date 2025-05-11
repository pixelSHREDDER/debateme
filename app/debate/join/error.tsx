/* eslint-disable max-len */

'use client'

import { Button, Text } from '@mantine/core'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error)
  }, [error])

  switch (error.message) {
    case 'Failed to find invite by debate id: No Invite found':
      return (
        <>
          <h2>This link isn&apos;t working!</h2>
          <Text>It may have been used already, or may have been copied wrong. Try asking the person who sent you the link to try again.</Text>
        </>
      )
    case 'No invite ID specified':
      return (
        <>
          <h2>This link isn&apos;t working!</h2>
          <Text>It may have been copied wrong. Try asking the person who sent you the link to send it again.</Text>
        </>
      )
    default:
      return (
        <>
          <h2>Something went wrong!</h2>
          <Button onClick={() => reset()}>
            Try again
          </Button>
        </>
      )
  }
}
