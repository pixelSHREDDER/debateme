import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { FontSize, LanguageTool } from '@/components/Editor/extensions'

const extensions = [
  FontSize,
  LanguageTool.configure({
    language: 'en-US', // it can detect language automatically or you can write your own language like 'en-US'
    apiUrl: `${process.env.NEXT_PUBLIC_LANGUAGETOOL_SERVER_URL}/v2/check`, // For testing purposes, you can use [Public API](https://dev.languagetool.org/public-http-api), but keep an eye on the rules that they've written there
    automaticMode: false, // if true, it will start proofreading immediately otherwise only when you execute `proofread` command of the extension.
  }),
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
  TextStyle,
]

export default extensions
