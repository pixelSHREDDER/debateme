'use client'

import { useEffect, useState } from 'react'
import { Button, Flex, Paper, ScrollArea, Text } from '@mantine/core'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { Match } from './extensions'

export default function Suggestions({ onProofread }: { onProofread: Function }) {
  const { editor } = useCurrentEditor()
  const [match, setMatch] = useState<Match | null>(null)

  const updateMatch = () => {
    if (editor) {
      //editor.commands.toggleLanguageTool()
      editor.commands.proofread()
      onProofread()
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

  /*const acceptSuggestion = (sug: any) => {
    if (editor) {
      editor.commands.insertContent(sug.value)
    }
  }*/

  const ignoreMatch = () => {
    if (editor) {
      editor.commands.ignoreLanguageToolSuggestion()
    }
  }

  if (!editor) {
    return 'derp'
  }

  return (
    <>
      <Button onClick={updateMatch} mb={20}>Proofread</Button>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}/* shouldShow={{ editor }}*/>
        <Paper shadow="xl" p="xs" withBorder>
          <details className="message-section">
            <summary dangerouslySetInnerHTML={{ __html: match ? `${match.shortMessage}` : 'No Message' }} />
            <ScrollArea type="auto" h="10rem" mb="md">
              <Text
                size="sm"
                m={0}
                dangerouslySetInnerHTML={{ __html: match ? `${match.message.replaceAll('\\n', '<br/>')}<br/><br/>` : 'No Message' }}
              />
            </ScrollArea>
          </details>
          {/*<section className="examples-section">
            {match?.examples &&
              <>
                <Text>For example:</Text>
                <List>
                  {match.examples.map((example: any, i: number) => (
                    <ListItem
                      key={i + example.value}
                      className="suggestion"
                    >
                      { example.value }
                    </ListItem>
                  ))}
                </List>
              </>
            }
          </section>*/}
          <details className="suggestions-section">
            {match?.replacements &&
              <>
                <summary>Suggestions:</summary>
                {/*<List>
                  {match.replacements.map((replacement: any, i: number) => (
                    <ListItem
                      key={i + replacement.value}
                      className="suggestion"
                    >
                      { replacement.value }
                    </ListItem>
                  ))}
                </List>*/}
                <ScrollArea type="auto" h="10rem">
                  {match.replacements.map((replacement: any, i: number) => (
                    <Text
                      size="sm"
                      m={0}
                      key={i + replacement.value}
                      dangerouslySetInnerHTML={{ __html: replacement.value.replaceAll('\\n', '<br/>') }}
                    />
                  ))}
                </ScrollArea>
              </>
            }
          </details>
          <Flex align="center" gap="xs" my="xs">
            <Button
              onClick={ignoreMatch}
              size="xs"
              className="suggestion"
            >
              Ignore
            </Button>
            {match?.rule?.urls?.length === 1 &&
              <Text size="sm"><a href={match.rule.urls[0].value} target="_blank">Learn more</a></Text>
            }
          </Flex>
          <Text size="xs">Powered by <a href="https://languagetool.org/" target="_blank">LanguageTool</a></Text>
        </Paper>
      </BubbleMenu>
    </>
  )
}
