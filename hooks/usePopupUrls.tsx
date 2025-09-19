import React, { useMemo } from 'react'

export const usePopupUrls = (urls?: string[]): React.ReactNode[] =>
  useMemo(() => {
    const output: React.ReactNode[] = []
    if (!urls || urls.length === 0) {
      return output
    }

    output.push('Click ')

    if (urls.length === 1) {
      output.push(
        <a key={0} href={urls[0]} target="_blank" rel="noreferrer noopener">here</a>
      )
    } else if (urls.length === 2) {
      output.push(
        <a key={0} href={urls[0]} target="_blank" rel="noreferrer noopener">here</a>
      )
      output.push(' or ')
      output.push(
        <a key={1} href={urls[1]} target="_blank" rel="noreferrer noopener">here</a>
      )
    } else {
      urls.forEach((url, index) => {
        output.push(
          <a key={index} href={url} target="_blank" rel="noreferrer noopener">{index === urls.length - 1 ? 'or here' : 'here, '}</a>
        )
      })
    }

    output.push(' to learn more.')

    return output
  }, [urls])
