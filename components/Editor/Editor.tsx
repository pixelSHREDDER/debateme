'use client'

import cx from 'clsx'
import { ActionIcon, Group, Tooltip } from '@mantine/core'
import './editor.scss'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  IconArrowBack,
  IconArrowForward,
  IconArrowsHorizontal,
  IconBlockquote,
  IconBold,
  IconCode,
  IconHeading,
  IconItalic,
  IconLink,
  IconLinkMinus,
  IconList,
  IconListNumbers,
  IconPageBreak,
  IconPilcrow,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
} from '@tabler/icons-react'
import { useCallback } from 'react'
import editorStyles from './Editor.module.css'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  const setLink = useCallback(() => {
    if (!editor) { return null }

    const previousUrl = editor.getAttributes('link').href
    // eslint-disable-next-line no-alert
    const url = window.prompt('URL', previousUrl)

    if (url === null) { return }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) { return null }

  return (
      <Group gap="xs" justify="flex-start">
      <ActionIcon.Group>
        <Tooltip label="Bold">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            variant="filled"
            size="md"
            aria-label="Toggle bold"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('bold') })}
          >
            <IconBold stroke={editor.isActive('bold') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Italic">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            aria-label="Toggle italic"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('italic') })}
          >
            <IconItalic stroke={editor.isActive('italic') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Strikethrough">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            aria-label="Toggle strikethrough"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('strike') })}
          >
            <IconStrikethrough stroke={editor.isActive('strike') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Subscript">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleSubscript()
                .run()
            }
            aria-label="Toggle subscript"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('subscript') })}
          >
            <IconSubscript stroke={editor.isActive('subscript') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Superscript">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleSuperscript()
                .run()
            }
            aria-label="Toggle superscript"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('superscript') })}
          >
            <IconSuperscript stroke={editor.isActive('superscript') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        {/*<Tooltip label="">
        <ActionIcon
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('code') })}
        >
          code
        </ActionIcon>
        </Tooltip>
        <Tooltip label="">
        <ActionIcon
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={editorStyles.icon}
        >
          clear marks
        </ActionIcon>
        </Tooltip>
        <Tooltip label="">
        <ActionIcon
          onClick={() => editor.chain().focus().clearNodes().run()}
          className={editorStyles.icon}
        >
          clear nodes
        </ActionIcon>*/}
      </ActionIcon.Group>
      <ActionIcon.Group>
        <Tooltip label="Normal text">
          <ActionIcon
            onClick={() => editor.chain().focus().setParagraph().run()}
            aria-label="Toggle normal text"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('paragraph') })}
          >
            <IconPilcrow stroke={editor.isActive('paragraph') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Heading">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            aria-label="Toggle heading"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('heading', { level: 3 }) })}
          >
            <IconHeading stroke={editor.isActive('heading', { level: 3 }) ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Subheading">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            aria-label="Toggle subheading"
            pt={4}
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('heading', { level: 4 }) })}
          >
            <IconHeading stroke={editor.isActive('heading', { level: 4 }) ? 3 : 1.5} size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Bullet list">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Toggle bullet list"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('bulletList') })}
          >
            <IconList stroke={editor.isActive('bulletList') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Numbered list">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Toggle numbered list"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('orderedList') })}
          >
            <IconListNumbers stroke={editor.isActive('orderedList') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Blockquote">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Toggle blockquote"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('blockquote') })}
          >
            <IconBlockquote stroke={editor.isActive('blockquote') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Code block">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Toggle code block"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('codeBlock') })}
          >
            <IconCode stroke={editor.isActive('codeBlock') ? 3 : 1.5} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <Tooltip label="Add/edit link">
          <ActionIcon
            onClick={setLink}
            aria-label="Add or edit link"
            className={cx(editorStyles.icon, { [editorStyles.isActive]: editor.isActive('link') })}>
            <IconLink stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Remove link">
          <ActionIcon
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
            aria-label="Remove link"
            className={editorStyles.icon}>
            <IconLinkMinus stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Add a horizontal rule">
          <ActionIcon
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label="Add a horizontal rule"
            className={editorStyles.icon}
          >
            <IconArrowsHorizontal stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Add a hard break">
          <ActionIcon
            onClick={() => editor.chain().focus().setHardBreak().run()}
            aria-label="Add a hard break"
            className={editorStyles.icon}
          >
            <IconPageBreak stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <Tooltip label="Undo">
          <ActionIcon
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            aria-label="Undo"
            className={editorStyles.icon}
          >
            <IconArrowBack stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Redo">
          <ActionIcon
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            aria-label="Redo"
            className={editorStyles.icon}
          >
            <IconArrowForward stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
      </Group>
  )
}

const extensions = [
  Link.configure({
    defaultProtocol: 'https',
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Subscript,
  Superscript,
]

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
        extensions={extensions}
        content=""
        onUpdate={e => onUpdate(e.editor.getHTML())}>
        {children}
      </EditorProvider>
  )
}
