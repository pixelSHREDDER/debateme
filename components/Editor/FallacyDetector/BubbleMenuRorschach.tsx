import React, { useRef } from 'react'
import {
  Button,
  Text,
  Paper,
  Flex,
  CloseButton,
} from '@mantine/core'
import { FOUND_FALLACY_PREFIXES, RorschachModalContentType } from './constants'
import { IRorschachPopupData } from './types'
import { usePopupUrls } from '../../../hooks/usePopupUrls'

export interface IBubbleMenuRorschachProps {
  closePopup: () => void
  ignoreTerm: () => void
  isReadOnly: boolean
  openModal: (contentType: RorschachModalContentType) => void
  popupData?: IRorschachPopupData
}

export const BubbleMenuRorschach = (
  { closePopup, ignoreTerm, isReadOnly, openModal, popupData }: IBubbleMenuRorschachProps
) => {
  const foundFallacyPrefix = useRef<string>(
    FOUND_FALLACY_PREFIXES[Math.floor(Math.random() * FOUND_FALLACY_PREFIXES.length)]
  )
  const popupUrls = usePopupUrls(popupData?.urls)

  return (
    <Paper shadow="xl" p="xs" withBorder>
      <Flex justify="space-between" gap="xs">
        <Text>
          {popupData ? `${foundFallacyPrefix.current} This looks like a Rorschach Term.` : 'unknown Rorschach Term.'}
        </Text>
        <CloseButton onClick={closePopup} />
      </Flex>
      <Button variant="transparent" onClick={() => openModal(RorschachModalContentType.Meanings)}>What&apos;s that?</Button>
      {isReadOnly && popupData?.rebuttal &&
        <Button variant="transparent" onClick={() => openModal(RorschachModalContentType.Rebuttal)}>What should I do?</Button>
      }
      {!isReadOnly && popupData?.recommendation &&
        <Button variant="transparent" onClick={() => openModal(RorschachModalContentType.Recommendation)}>What should I do?</Button>
      }
      <Flex align="center" gap="xs" my="xs">
        <Button
          onClick={ignoreTerm}
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
