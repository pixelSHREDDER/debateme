import React, { useState, useEffect, useCallback, useRef } from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import {
  Button,
  Text,
  Paper,
  Flex,
  Modal,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getFallacyById, LogicalFallacy } from './fallacies'
import { DetectedFallacy, detectTextFallacies } from './detectTextFallacies'

export interface PopupData extends LogicalFallacy {
  originalText: string
  instanceKey: string
}

export function FallacyDetector({ onProofread }: { onProofread: Function }) {
  // TODO: Should we stores all detected fallacies from the last proofread?
  /*const [
    currentDetectedFallacies,
    setCurrentDetectedFallacies,
  ] = useState<Map<string, DetectedFallacyType>>(new Map())*/
  const [ignoredFallacyKeys, setIgnoredFallacyKeys] = useState<Set<string>>(new Set())
  const [popupData, setPopupData] = useState<PopupData | null>(null)
  const { editor } = useCurrentEditor()
  const buttonLabel = useRef<string>('Continue')
  const modalContent = useRef<string>('')
  const [opened, { open, close }] = useDisclosure(false)

const onOpenModal = ((isRecommendation: boolean) => {
  modalContent.current = isRecommendation ?
  (popupData?.recommendation || '') :
  `${popupData?.description}<br/>For example:<br/>${popupData?.example}`
  open()
})

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
    buttonLabel.current = 'Proofread again'
    onProofread()
  }, [editor, clearAllFallacyMarks, applyFallacyMarks, onProofread])

  useEffect(() => {
    if (!editor) return

    const editorDom = editor.view.dom

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const fallacySpan = target.closest('span.fallacy-underline[data-fallacy-id][data-instance-key]')

      if (fallacySpan) {
        const fallacyId = fallacySpan.getAttribute('data-fallacy-id')
        const originalText = fallacySpan.getAttribute('data-original-text')
        const instanceKey = fallacySpan.getAttribute('data-instance-key')

        if (fallacyId && originalText && instanceKey && !ignoredFallacyKeys.has(instanceKey)) {
          const fallacyDetails = getFallacyById(fallacyId)
          if (fallacyDetails) {
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
    return () => {
      editorDom.removeEventListener('click', handleClick)
    }
  }, [editor, ignoredFallacyKeys])

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
      <Button onClick={handleProofread} mb={20}>{buttonLabel.current}</Button>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      {popupData &&
        <Paper shadow="xl" p="xs" withBorder>
          <Text>
            {popupData ? `Careful! This may be an example of the ${popupData.name}.` : 'unknown fallacy.'}
          </Text>
          <Button variant="transparent" onClick={() => onOpenModal(false)}>What&apos;s that?</Button>
          {popupData?.recommendation &&
            <Button variant="transparent" onClick={() => onOpenModal(true)}>What should I do?</Button>
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
      <Modal zIndex={9999} opened={opened} onClose={close} centered title={popupData?.name}>
        <Stack>
          <Text dangerouslySetInnerHTML={{ __html: modalContent.current }} />
          <Flex gap="sm">
            <Button variant="outline" onClick={close}>Got it</Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  ) : ''
}
