'use client'

import '@/components/Editor/editor.scss'
import { EditorProvider } from '@tiptap/react'
import Suggestions from '@/components/Editor/Suggestions'
import MenuBar from '@/components/Editor/MenuBar'
import extensions from '@/components/Editor/DefaultExtensions'

interface IEditor {
  id: string,
  onUpdate: Function,
  required: string,
  testid: string,
}

export default function Editor(
  { id, onUpdate, required, testid }: IEditor,
  { children }: { children: React.ReactNode }
) {
  return (
    <EditorProvider
      editorProps={{ attributes: { id, required, testid } }}
      slotBefore={<MenuBar />}
      slotAfter={<Suggestions />}
      extensions={extensions}
      content=""
      onUpdate={e => onUpdate(e.editor.getHTML())}
      >
      {children}
    </EditorProvider>
  )
}
