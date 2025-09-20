'use client'

import React, { useMemo, useState, useRef, useEffect } from 'react'
import '@/components/Editor/editor.scss'
import { EditorProvider } from '@tiptap/react'
import MenuBar from '@/components/Editor/MenuBar'
import extensions from '@/components/Editor/DefaultExtensions'
import { Editor as TEditor } from '@tiptap/core'
import { FallacyDetector } from './FallacyDetector/FallacyDetector'

interface IEditor {
  id: string,
  onProofread: Function,
  onUpdate: Function,
  required: string,
  testid: string,
  draftKey?: string,
}

export default function Editor(
  { id, onProofread, onUpdate, required, testid, draftKey }: IEditor,
  { children }: { children: React.ReactNode }
) {
  const initialDraft = useMemo(() => {
    if (typeof window === 'undefined' || !draftKey) return ''
    try {
      return sessionStorage.getItem(draftKey) ?? ''
    } catch {
      return ''
    }
  }, [draftKey])
  const [initialContent] = useState<string>(initialDraft)
  const latestContentRef = useRef<string>(initialDraft)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(() => {
    if (typeof window === 'undefined' || !draftKey) return null
    try {
      const ts = sessionStorage.getItem(`${draftKey}:ts`)
      return ts ? Number(ts) : null
    } catch {
      return null
    }
  })

  const handleUpdate = ({ editor }: { editor: TEditor }) => {
    if (!editor) return
    const html = editor.getHTML()
    latestContentRef.current = html
    onUpdate(html)
  }

  const handleSaveDraft = () => {
    if (!draftKey) return

    const now = Date.now()
    sessionStorage.setItem(draftKey, latestContentRef.current || '')
    sessionStorage.setItem(`${draftKey}:ts`, String(now))
    setLastSavedAt(now)
  }

  useEffect(() => {
    if (!draftKey) return

    const interval = window.setInterval(() => {
      const now = Date.now()
      sessionStorage.setItem(draftKey, latestContentRef.current || '')
      sessionStorage.setItem(`${draftKey}:ts`, String(now))
      setLastSavedAt(now)
    }, 5 * 60 * 1000)
    return () => window.clearInterval(interval)
  }, [draftKey])

  useEffect(() => {
    if (initialDraft) {
      onUpdate(initialDraft)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EditorProvider
      editorProps={{ attributes: { id, required, testid } }}
      slotBefore={<MenuBar onSaveDraft={handleSaveDraft} lastSavedAt={lastSavedAt} />}
      slotAfter={<FallacyDetector onProofread={onProofread} />}
      extensions={extensions}
      content={initialContent}
      onUpdate={e => handleUpdate(e)}
      >
      {children}
    </EditorProvider>
  )
}
