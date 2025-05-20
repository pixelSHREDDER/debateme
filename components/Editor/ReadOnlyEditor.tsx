'use client'

import '@/components/Editor/editor.scss'
import { Content, EditorProvider } from '@tiptap/react'
import extensions from '@/components/Editor/DefaultExtensions'
import { FallacyDetector } from './FallacyDetector/FallacyDetector'

interface IReadOnlyEditor {
  content: Content,
  id: string,
  testid: string,
}

export default function ReadOnlyEditor(
  { id, content, testid }: IReadOnlyEditor,
  { children }: { children: React.ReactNode }
) {
  return (
    <EditorProvider
      editorProps={{ attributes: { id, required: 'false', testid } }}
      slotAfter={<FallacyDetector isReadOnly />}
      extensions={extensions}
      editable={false}
      content={content}
      >
      {children}
    </EditorProvider>
  )
}
