'use client'

import './editor.scss'
//import ListItem from '@tiptap/extension-list-item'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`border m-1 p-1 ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`border m-1 p-1 ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`border m-1 p-1 ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`border m-1 p-1 ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="border m-1 p-1"
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="border m-1 p-1"
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`border m-1 p-1 ${editor.isActive('paragraph') ? 'is-active' : ''}`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`border m-1 p-1 ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`border m-1 p-1 ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`border m-1 p-1 ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`border m-1 p-1 ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`border m-1 p-1 ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="border m-1 p-1"
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="border m-1 p-1"
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="border m-1 p-1"
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className="border m-1 p-1"
      >
        redo
      </button>
    </>
  )
}

const extensions = [
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
