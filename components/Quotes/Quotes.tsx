import { theme } from '@/theme'
import { Alert } from '@mantine/core'
import { useId } from 'react'
import quotesStyles from './Quotes.module.css'
import quotesText from './QuotesText'

export default function Quotes() {
  const id = useId()
  const getQuote = () => quotesText[Math.floor(Math.random() * quotesText.length)]
  return (
    <Alert
      className={quotesStyles.quotes}
      component="aside"
      variant="outline"
      fs="italic"
      id={`alert_quotes_${id}`}
      p={6}
      color={theme.colors?.purple?.[4] || 'purple'}
      radius="md"
      w="auto"
      maw="75%">
      {getQuote()}
    </Alert>
  )
}
