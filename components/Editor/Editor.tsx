'use client'

import '@/components/Editor/editor.scss'
import { EditorProvider } from '@tiptap/react'
import MenuBar from '@/components/Editor/MenuBar'
import extensions from '@/components/Editor/DefaultExtensions'
import { FallacyDetector } from './FallacyDetector/FallacyDetector'

interface IEditor {
  id: string,
  onProofread: Function,
  onUpdate: Function,
  required: string,
  testid: string,
}

export default function Editor(
  { id, onProofread, onUpdate, required, testid }: IEditor,
  { children }: { children: React.ReactNode }
) {
  return (
    <EditorProvider
      editorProps={{ attributes: { id, required, testid } }}
      slotBefore={<MenuBar />}
      slotAfter={<FallacyDetector onProofread={onProofread} />}
      extensions={extensions}
      content=""
      onUpdate={e => onUpdate(e.editor.getHTML())}
      >
      {children}
    </EditorProvider>
  )
}
