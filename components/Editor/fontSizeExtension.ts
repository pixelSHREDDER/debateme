import { Extension, RawCommands } from '@tiptap/react'

/**
 * FontSize - Custom Extension
 * editor.commands.setFontSize(e.target.value) :set the font-size.
 */

 export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize: (fontSize: number) => ({ chain }: any) => chain()
        .setMark('textStyle', { fontSize: `${fontSize}rem` })
        .run(),
      unsetFontSize: () => ({ chain }: any) => chain()
        .setMark('textStyle', { fontSize: null })
        .removeEmptyTextStyle()
        .run(),
    } as Partial<RawCommands>
  },
})
