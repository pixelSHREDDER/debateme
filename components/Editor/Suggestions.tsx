'use client'

import { useEffect, useState } from 'react'
import { Button, Paper, Text } from '@mantine/core'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'

export default function Suggestions() {
  const { editor } = useCurrentEditor()
  const [match, setMatch] = useState<any>(null)

  const updateMatch = () => {
    if (editor) {
      //editor.commands.toggleLanguageTool()
      editor.commands.proofread()
      //console.log(editor.extensionStorage.languagetool)
      //editor.commands.toggleLanguageTool()
    }
  }

  useEffect(() => {
    setMatch(editor?.extensionStorage.languagetool.match)
  }, [editor?.extensionStorage.languagetool.match])

  /*const update = (e: any) => {
    setTimeout(() => updateMatch(e.editor))
  }*/

  /*const selectionUpdate = (e: any) => {
    setTimeout(() => updateMatch(e.editor))
  }*/

  /*const proofread = useCallback(() => {
    if (!editor) { return null }

    editor.chain().focus().proofread().run()
  }, [editor])*/

  /*const updateHtml = () => {
    if (editor) {
      navigator.clipboard.writeText(editor.getHTML())
    }
  }*/

  const acceptSuggestion = (sug: any) => {
    if (editor) {
      editor.commands.insertContent(sug.value)
    }
  }

  if (!editor) {
    return ''
  }

  return (
    <>
      <Button onClick={updateMatch}>proofread</Button>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}/* shouldShow={{ editor }}*/>
        <Paper shadow="xl" p="xs" withBorder>
        <section className="message-section">
          <Text>{ match?.message || 'No Message' }</Text>
        </section>
        <section className="suggestions-section">
          { match?.replacements?.map((replacement: any, i: number) => (
            <button
              onClick={() => acceptSuggestion(replacement)}
              key={i + replacement.value}
              className="suggestion"
            >
              { replacement.value }
            </button>
          ))}
        </section>
        </Paper>
      </BubbleMenu>
    </>
  )
}
