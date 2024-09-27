import { Alert } from '@mantine/core'
import {
  IconInfoCircle,
} from '@tabler/icons-react'

const enum AlertType {
  Success,
  Warning,
  Error
}

interface IFormAlert {
  message: string,
  title: string,
  type: AlertType,
}

const colors = ['green', 'yellow', 'red']

export default function FormAlert(props: IFormAlert) {
  function getIcon() {
    if (props.type === AlertType.Success) {
      return <IconInfoCircle />
    }

    if (props.type === AlertType.Warning) {
      return <IconInfoCircle />
    }

    return <IconInfoCircle />
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
