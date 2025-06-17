'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import '@/components/Editor/editor.scss'
import { Content, EditorProvider } from '@tiptap/react'
import extensions from '@/components/Editor/DefaultExtensions'
import { FallacyDetector } from './FallacyDetector/FallacyDetector'

interface IReadOnlyEditor {
  children?: React.ReactNode,
  content: Content,
  id: string,
  testid: string,
}

export interface ReadOnlyEditorRef {
  triggerCoach: () => void;
}

const ReadOnlyEditor = forwardRef<ReadOnlyEditorRef, IReadOnlyEditor>(
  ({ id, content, testid, children }, ref) => {
    const fallacyDetectorRef = useRef<{ triggerProofread:() => void }>(null)

    useImperativeHandle(ref, () => ({
      triggerCoach: () => {
        fallacyDetectorRef.current?.triggerProofread()
      },
    }))

    return (
      <EditorProvider
        editorProps={{ attributes: { id, required: 'false', testid } }}
        slotAfter={<FallacyDetector ref={fallacyDetectorRef} isReadOnly />}
        extensions={extensions}
        editable={false}
        content={content}
      >
        {children}
      </EditorProvider>
    )
  }
)

ReadOnlyEditor.displayName = 'ReadOnlyEditor'

export default ReadOnlyEditor
