import { Alert } from '@mantine/core'
import {
  IconHeartBroken,
  IconInfoCircle,
  IconThumbUp,
} from '@tabler/icons-react'
import { useId } from 'react'

const enum AlertType {
  Success,
  Warning,
  Error
}

interface IFormAlert {
  message: string,
  title: string,
  testid?: string,
  type: AlertType,
}

const colors = ['green', 'yellow', 'red']

export default function FormAlert(props: IFormAlert) {
  const id = useId()

  function getIcon() {
    if (props.type === AlertType.Success) {
      return <IconThumbUp />
    }

    if (props.type === AlertType.Warning) {
      return <IconInfoCircle />
    }

    return <IconHeartBroken />
  }

  function getMessage() {
    switch (props.message) {
      case 'Please fix the following errors: String must contain at least 1 character(s)':
        return 'Looks like your turn is empty!'
      default:
        return props.message
    }
  }

  return (
    <Alert
      data-testid={props.testid || ''}
      id={`alert_form_alert_${id}`}
      aria-live="polite"
      variant="light"
      color={colors[props.type]}
      radius="lg"
      title={props.title}
      my={20}
      icon={getIcon()}>
        {getMessage()}
    </Alert>
  )
}
