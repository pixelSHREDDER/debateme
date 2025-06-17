import React, { useState, useEffect, useCallback, useRef } from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import {
  Button,
  Text,
  Paper,
  Flex,
  Modal,
  Stack,
  CloseButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getFallacyById, LogicalFallacy } from './fallacies'
import { DetectedFallacy, detectTextFallacies } from './detectTextFallacies'

const FOUND_FALLACY_PREFIXES = [
  'Careful!',
  'Watch out!',
  'Whoa now!',
  'Easy there.',
  '*blows whistle* Time out!!',
  'Hang on.',
  'Whoops!',
]

const ANSWER_PREFIXES = [
  'Try this:',
  'Hm.. How about:',
  'What about:',
  'Hm....',
  'Lemme think....',
  'Good question!',
  'That&apos;s a good question....',
]

enum ModalContentType {
  Description = 'description',
  Rebuttal = 'rebuttal',
  Recommendation = 'recommendation',
}

export interface IPopupData extends LogicalFallacy {
  originalText: string
  instanceKey: string
}

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
  const [popupData, setPopupData] = useState<IPopupData | null>(null)
  const { editor } = useCurrentEditor()
  const buttonLabel = useRef<string>(isReadOnly ? 'Ask Coach' : 'Continue')
  const modalContent = useRef<string>('')
  const foundFallacyPrefix = useRef<string>(
    FOUND_FALLACY_PREFIXES[Math.floor(Math.random() * FOUND_FALLACY_PREFIXES.length)]
  )
  const answerPrefix = useRef<string>(
    ANSWER_PREFIXES[Math.floor(Math.random() * ANSWER_PREFIXES.length)]
  )
  const popupOpen = useRef<boolean>(false)
  const [opened, { open, close }] = useDisclosure(false)

  const onOpenModal = ((contentType: ModalContentType) => {
    const content = popupData ? popupData[contentType] : ''
    if (contentType === ModalContentType.Description) {
      modalContent.current = `${content}<br/>For example:<br/>${popupData?.example}`
    } else {
      modalContent.current = `${answerPrefix.current} ${content}`
    }
    open()
  })

  const onClosePopup = () => {
    popupOpen.current = false
    setPopupData(null)
  }

  const clearAllFallacyMarks = useCallback(() => {
    if (!editor) return
    const { tr, doc } = editor.state
    // TODO: Typing broken so removing all marks, fine for now but could be issue if other marks added
    //editor.view.dispatch(tr.removeMark(0, doc.content.size, FallacyMark))
    editor.view.dispatch(tr.removeMark(0, doc.content.size, null))
  }, [editor])

  const applyFallacyMarks = useCallback((fallaciesToApply: DetectedFallacy[]) => {
    if (!editor) return
    fallaciesToApply.forEach(fallacy => {
      if (!ignoredFallacyKeys.has(fallacy.key)) {
        editor.chain()
        .setTextSelection({ from: fallacy.from, to: fallacy.to })
        .setFallacyMark({
          fallacyId: fallacy.id,
          originalText: fallacy.text,
          instanceKey: fallacy.key,
        })
        .run()
      }
    })
    editor.commands.setTextSelection(editor.state.doc.content.size)
  }, [editor, ignoredFallacyKeys])

  const handleProofread = useCallback(() => {
    if (!editor) return
    const currentText = editor.getText()

    clearAllFallacyMarks()
    setIgnoredFallacyKeys(new Set())
    setPopupData(null)

    const foundFallacies = detectTextFallacies(currentText)
    // TODO: Part of saved fallacies logic
    //const newFallaciesMap = new Map<string, DetectedFallacyType>()
    //foundFallacies.forEach(f => newFallaciesMap.set(f.key, f))

    //setCurrentDetectedFallacies(newFallaciesMap)
    applyFallacyMarks(foundFallacies)
    buttonLabel.current = isReadOnly ? 'Ask again' : 'Proofread again'
    onProofread && onProofread()
  }, [editor, clearAllFallacyMarks, applyFallacyMarks, isReadOnly, onProofread])

  React.useImperativeHandle(ref, () => ({
    triggerProofread: handleProofread,
  }))

  useEffect(() => {
    if (!editor) return

    //const editorDom = isReadOnly ? editor.view.dom.parentElement : editor.view.dom
    const editorDom = editor.view.dom

    if (!editorDom) return

    const getFallacySpan = (target: HTMLElement) => {
      const selector = 'span.fallacy-underline[data-fallacy-id][data-instance-key]'
      return target.matches(selector) ? target : target.closest(selector)
    }

    const handleClick = (event: MouseEvent) => {
      popupOpen.current = false
      const target = event.target as HTMLElement
      const fallacySpan = getFallacySpan(target)
      //const fallacySpan = target.closest('span.fallacy-underline[data-fallacy-id][data-instance-key].active')

      if (fallacySpan) {
        const fallacyId = fallacySpan.getAttribute('data-fallacy-id')
        const originalText = fallacySpan.getAttribute('data-original-text')
        const instanceKey = fallacySpan.getAttribute('data-instance-key')

        if (fallacyId && originalText && instanceKey && !ignoredFallacyKeys.has(instanceKey)) {
          const fallacyDetails = getFallacyById(fallacyId)
          if (fallacyDetails) {
            popupOpen.current = true
            setPopupData({
              ...fallacyDetails,
              originalText,
              instanceKey,
            })
          }
        }
      }
    }

    editorDom.addEventListener('click', handleClick)
    /*editorDom.addEventListener('mousedown', () => {
        if (!editor.view.editable) {
          editorDom.setAttribute('contenteditable', 'true')
          editorDom.focus()
          return false
        }
      })
      editorDom.addEventListener('mouseup', () => {
        if (!editor.view.editable) {
          editorDom.setAttribute('contenteditable', 'false')
        }
        return false
      })*/
    return () => {
      editorDom.removeEventListener('click', handleClick)
    }
  }, [editor, ignoredFallacyKeys, isReadOnly])

  const handleIgnoreFallacy = () => {
    if (popupData && editor) {
      setIgnoredFallacyKeys(prev => new Set(prev).add(popupData.instanceKey))
      // TODO: solve need for this try-catch workaround
      try {
        editor.commands.unsetFallacyMark(popupData.instanceKey)
      } catch (e: any) {
        setPopupData(null)
        return
      }
      setPopupData(null)
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
        tippyOptions={{ duration: 100 }}
        updateDelay={0}
        shouldShow={() => isReadOnly ? !!popupOpen.current : true}
        /*shouldShow={(e: any) => {
          //const { editor, state } = e
          const { selection } = e.state
          const hasHighlight = editor.isActive('highlight')
          return hasHighlight && !selection.empty
        }}*/>
      {popupData &&
        <Paper shadow="xl" p="xs" withBorder>
          <Flex justify="space-between" gap="xs">
            <Text>
              {popupData ? `${foundFallacyPrefix.current} This may be an example of the ${popupData.name} Fallacy.` : 'unknown fallacy.'}
            </Text>
            <CloseButton onClick={onClosePopup} />
          </Flex>
          <Button variant="transparent" onClick={() => onOpenModal(ModalContentType.Description)}>What&apos;s that?</Button>
          {isReadOnly && popupData?.rebuttal &&
            <Button variant="transparent" onClick={() => onOpenModal(ModalContentType.Rebuttal)}>What should I do?</Button>
          }
          {!isReadOnly && popupData?.recommendation &&
            <Button variant="transparent" onClick={() => onOpenModal(ModalContentType.Recommendation)}>What should I do?</Button>
          }
          <Flex align="center" gap="xs" my="xs">
            <Button
              onClick={handleIgnoreFallacy}
              size="xs"
              className="suggestion"
            >
              Ignore
            </Button>
            {popupData.url &&
              <Text size="sm"><a href={popupData.url} target="_blank">Learn more</a></Text>
            }
          </Flex>
        </Paper>
      }
      </BubbleMenu>
      <Modal zIndex={9999} opened={opened} onClose={close} centered title={`${popupData?.name} Fallacy`}>
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
