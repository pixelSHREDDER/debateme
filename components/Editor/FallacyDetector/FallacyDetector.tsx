import React, { useState, useEffect, useCallback, useRef } from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import {
  Button,
  Text,
  Flex,
  Modal,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getFallacyById } from './fallacies'
import { detectTextFallacies } from './detectTextFallacies'
import { BubbleMenuLogical } from './BubbleMenuLogical'
import { BubbleMenuRorschach } from './BubbleMenuRorschach'
import { ANSWER_PREFIXES, FallacyType, LogicalModalContentType, RORSCHACH_MEANINGS_PREFIX, RORSCHACH_RECOMMENDATION_PREFIX, RorschachModalContentType } from './constants'
import { ILogicalPopupData, IRorschachPopupData, DetectedFallacy } from './types'
import { getRorschachTermById } from './rorschachs'

export interface IFallacyDetector {
  isReadOnly?: boolean,
  onProofread?: Function,
}

export const FallacyDetector = React.forwardRef<{
  triggerProofread:() => void;
}, IFallacyDetector>(({ isReadOnly = false, onProofread }, ref) => {
  // TODO: Should we stores all detected fallacies from the last proofread?
  /*const [
    currentDetectedFallacies,
    setCurrentDetectedFallacies,
  ] = useState<Map<string, DetectedFallacyType>>(new Map())*/
  const [ignoredFallacyKeys, setIgnoredFallacyKeys] = useState<Set<string>>(new Set())
  const [logicalPopupData, setLogicalPopupData] = useState<ILogicalPopupData | null>(null)
  const [rorschachPopupData, setRorscachPopupData] = useState<IRorschachPopupData | null>(null)
  const { editor } = useCurrentEditor()
  const buttonLabel = useRef<string>(isReadOnly ? 'Ask Coach' : 'Continue')
  const modalContent = useRef<string>('')
  const modalTitle = useRef<string>('')
  const answerPrefix = useRef<string>(
    ANSWER_PREFIXES[Math.floor(Math.random() * ANSWER_PREFIXES.length)]
  )
  const popupOpen = useRef<FallacyType | null>(null)
  const [opened, { open, close }] = useDisclosure(false)

  const onOpenLogicalModal = ((contentType: LogicalModalContentType) => {
    const content = logicalPopupData?.[contentType as keyof typeof logicalPopupData] || ''
    if (contentType === LogicalModalContentType.Description) {
      modalContent.current = `${content}<br/>For example:<br/>${logicalPopupData?.example}`
      modalTitle.current = `${logicalPopupData?.name} Fallacy`
    } else {
      modalContent.current = `${answerPrefix.current} ${content}`
      modalTitle.current = 'What Should I Do?'
    }
    open()
  })

  const onOpenRorschachModal = ((contentType: RorschachModalContentType) => {
    const content = rorschachPopupData?.[contentType as keyof typeof rorschachPopupData] || ''
    if (contentType === RorschachModalContentType.Meanings) {
      modalContent.current = `${RORSCHACH_MEANINGS_PREFIX}"${rorschachPopupData?.term}":<ul>${rorschachPopupData?.meanings.map((m: string) => `<li>${m}</li>`).join('')}</ul>`
      modalTitle.current = 'What\'s a Rorschach Term? (ROAR-shack)'
    } else {
      modalContent.current = `${answerPrefix.current} ${RORSCHACH_RECOMMENDATION_PREFIX} ${content}`
      modalTitle.current = 'What Should I Do?'
    }
    open()
  })

  const closeCurrentPopup = useCallback((popupType: FallacyType | null) => {
    if (popupType === FallacyType.Logical) {
      setLogicalPopupData(null)
    } else if (popupType === FallacyType.Rorschach) {
      setRorscachPopupData(null)
    }
  }, [])

  const onClosePopup = () => {
    closeCurrentPopup(popupOpen.current)
    popupOpen.current = null
  }

  const clearAllFallacyMarks = useCallback(() => {
    if (!editor) { return }
    const { tr, doc } = editor.state
    // TODO: Typing broken so removing all marks, fine for now but could be issue if other marks added
    //editor.view.dispatch(tr.removeMark(0, doc.content.size, FallacyMark))
    editor.view.dispatch(tr.removeMark(0, doc.content.size, null))
  }, [editor])

  const applyFallacyMarks = useCallback((fallaciesToApply: DetectedFallacy[]) => {
    if (!editor) { return }
    fallaciesToApply.forEach(fallacy => {
      if (!ignoredFallacyKeys.has(fallacy.key)) {
        editor.chain()
        .setTextSelection({ from: fallacy.from, to: fallacy.to })
        .setFallacyMark({
          fallacyId: fallacy.id,
          originalText: fallacy.text,
          instanceKey: fallacy.key,
          popupType: fallacy.type,
        })
        .run()
      }
    })
    editor.commands.setTextSelection(editor.state.doc.content.size)
  }, [editor, ignoredFallacyKeys])

  const handleProofread = useCallback(() => {
    if (!editor) { return }
    const currentText = editor.getText()

    clearAllFallacyMarks()
    setIgnoredFallacyKeys(new Set())
    closeCurrentPopup(popupOpen.current)

    const foundFallacies = detectTextFallacies(currentText)
    // TODO: Part of saved fallacies logic
    //const newFallaciesMap = new Map<string, DetectedFallacyType>()
    //foundFallacies.forEach(f => newFallaciesMap.set(f.key, f))

    //setCurrentDetectedFallacies(newFallaciesMap)
    applyFallacyMarks(foundFallacies)
    buttonLabel.current = isReadOnly ? 'Ask again' : 'Proofread again'
    onProofread && onProofread()
  }, [editor, clearAllFallacyMarks, closeCurrentPopup, applyFallacyMarks, isReadOnly, onProofread])

  React.useImperativeHandle(ref, () => ({
    triggerProofread: handleProofread,
  }))

  useEffect(() => {
    if (!editor) { return }

    const editorDom = editor.view.dom

    if (!editorDom) { return }

    const getFallacySpan = (target: HTMLElement) => {
      const selector = 'span.fallacy-underline[data-fallacy-id][data-instance-key]'
      return target.matches(selector) ? target : target.closest(selector)
    }

    const handleClick = (event: MouseEvent) => {
      popupOpen.current = null
      const target = event.target as HTMLElement
      const fallacySpan = getFallacySpan(target)

      if (fallacySpan) {
        const fallacyId = fallacySpan.getAttribute('data-fallacy-id')
        const originalText = fallacySpan.getAttribute('data-original-text')
        const instanceKey = fallacySpan.getAttribute('data-instance-key')
        const popupType = fallacySpan.getAttribute('data-popup-type')

        if (
          fallacyId && originalText && instanceKey && popupType && popupType.length > 0 &&
          !ignoredFallacyKeys.has(instanceKey)
        ) {
          const fallacyElement = document.querySelector(`span.fallacy-underline[data-fallacy-id="${fallacyId}"][data-instance-key="${instanceKey}"]`)
          const fallacyType = popupType as keyof typeof FallacyType

          if (fallacyElement && fallacyElement instanceof HTMLElement) {
            fallacyElement.parentElement?.click()
          }

          if (fallacyType === FallacyType.Logical) {
            const fallacyDetails = getFallacyById(fallacyId)

            if (!fallacyDetails) { return }

            popupOpen.current = fallacyType as FallacyType
            setLogicalPopupData({
              ...fallacyDetails,
              originalText,
              instanceKey,
              popupType: FallacyType.Logical,
            })
          } else if (fallacyType === FallacyType.Rorschach) {
            const fallacyDetails = getRorschachTermById(fallacyId)

            if (!fallacyDetails) { return }

            popupOpen.current = fallacyType as FallacyType
            setRorscachPopupData({
              ...fallacyDetails,
              originalText,
              instanceKey,
              popupType: FallacyType.Rorschach,
            })
          }
        }
      }
    }

    editorDom.addEventListener('click', handleClick)

    return () => editorDom.removeEventListener('click', handleClick)
  }, [editor, ignoredFallacyKeys, isReadOnly])

  const handleIgnore = () => {
    if (!editor) { return }
    if (popupOpen.current === FallacyType.Logical && logicalPopupData) {
      setIgnoredFallacyKeys(prev => new Set(prev).add(logicalPopupData.instanceKey))
      // TODO: solve need for this try-catch workaround
      try {
        editor.commands.unsetFallacyMark(logicalPopupData.instanceKey)
      } catch (e: any) {
        closeCurrentPopup(popupOpen.current)
        return
      }
      closeCurrentPopup(popupOpen.current)
    } else if (popupOpen.current === FallacyType.Rorschach && rorschachPopupData) {
      setIgnoredFallacyKeys(prev => new Set(prev).add(rorschachPopupData.instanceKey))
      // TODO: solve need for this try-catch workaround
      try {
        editor.commands.unsetFallacyMark(rorschachPopupData.instanceKey)
      } catch (e: any) {
        closeCurrentPopup(popupOpen.current)
        return
      }
      closeCurrentPopup(popupOpen.current)
    }
  }

  return editor ? (
    <>
      {!isReadOnly && (
        <Flex justify="flex-start">
          <Button onClick={handleProofread} mb={20}>{buttonLabel.current}</Button>
        </Flex>
      )}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 1000 }}
        updateDelay={1000}
        shouldShow={() => true}>
        {!!logicalPopupData &&
          <BubbleMenuLogical
            closePopup={onClosePopup}
            ignoreFallacy={handleIgnore}
            isReadOnly={isReadOnly}
            openModal={onOpenLogicalModal}
            popupData={logicalPopupData}
          />
        }
        {!!rorschachPopupData &&
          <BubbleMenuRorschach
            closePopup={onClosePopup}
            ignoreTerm={handleIgnore}
            isReadOnly={isReadOnly}
            openModal={onOpenRorschachModal}
            popupData={rorschachPopupData}
          />
        }
      </BubbleMenu>
      <Modal zIndex={9999} opened={opened} onClose={close} centered title={modalTitle.current}>
        <Stack>
          <Text dangerouslySetInnerHTML={{ __html: modalContent.current }} />
          <Flex gap="sm">
            <Button variant="outline" onClick={close}>Got it</Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  ) : ''
})

FallacyDetector.displayName = 'FallacyDetector'
