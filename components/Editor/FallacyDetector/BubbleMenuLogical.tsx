import React, { useRef } from 'react'
import {
  Button,
  Text,
  Paper,
  Flex,
  CloseButton,
} from '@mantine/core'
import { LogicalModalContentType, FOUND_FALLACY_PREFIXES } from './constants'
import { ILogicalPopupData } from './types'
import { usePopupUrls } from '../../../hooks/usePopupUrls'

export interface IBubbleMenuLogicalProps {
  closePopup: () => void
  ignoreFallacy: () => void
  isReadOnly: boolean
  openModal: (contentType: LogicalModalContentType) => void
  popupData?: ILogicalPopupData
}

export const BubbleMenuLogical = (
  { closePopup, ignoreFallacy, isReadOnly, openModal, popupData }: IBubbleMenuLogicalProps
) => {
  const foundFallacyPrefix = useRef<string>(
    FOUND_FALLACY_PREFIXES[Math.floor(Math.random() * FOUND_FALLACY_PREFIXES.length)]
  )
  const popupUrls = usePopupUrls(popupData?.urls)

  return (
    <Paper shadow="xl" p="xs" withBorder>
      <Flex justify="space-between" gap="xs">
        <Text>
          {popupData ? `${foundFallacyPrefix.current} This may be an example of the ${popupData.name} Fallacy.` : 'unknown fallacy.'}
        </Text>
        <CloseButton onClick={closePopup} />
      </Flex>
      <Button variant="transparent" onClick={() => openModal(LogicalModalContentType.Description)}>What&apos;s that?</Button>
      {isReadOnly && popupData?.rebuttal &&
        <Button variant="transparent" onClick={() => openModal(LogicalModalContentType.Rebuttal)}>What should I do?</Button>
      }
      {!isReadOnly && popupData?.recommendation &&
        <Button variant="transparent" onClick={() => openModal(LogicalModalContentType.Recommendation)}>What should I do?</Button>
      }
      <Flex align="center" gap="xs" my="xs">
        <Button
          onClick={ignoreFallacy}
          size="xs"
          className="suggestion"
        >
          Ignore
        </Button>
        {popupData?.urls && <Text size="sm">{popupUrls}</Text>}
      </Flex>
    </Paper>
  )
}
