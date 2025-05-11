import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fallacyMark: {
      setFallacyMark: (attributes: {
        fallacyId: string,
        originalText: string,
        instanceKey: string,
      }) => ReturnType;
      toggleFallacyMark: (attributes: {
        fallacyId: string,
        originalText: string,
        instanceKey: string,
      }) => ReturnType;
      unsetFallacyMark: (instanceKey?: string) => ReturnType
    };
  }
}

export interface FallacyMarkOptions {
  HTMLAttributes: Record<string, any>
}

export const FallacyMark = Mark.create<FallacyMarkOptions>({
  name: 'fallacy',
  addOptions() { return { HTMLAttributes: {} } },
  addAttributes() {
    return {
      fallacyId: {
        default: null,
        parseHTML: element => element.getAttribute('data-fallacy-id'),
        renderHTML: attributes => !attributes.fallacyId ? {} : { 'data-fallacy-id': attributes.fallacyId },
      },
      originalText: {
        default: null,
        parseHTML: element => element.getAttribute('data-original-text'),
        renderHTML: attributes => !attributes.originalText ? {} : { 'data-original-text': attributes.originalText },
      },
      instanceKey: {
        default: null,
        parseHTML: element => element.getAttribute('data-instance-key'),
        renderHTML: attributes => !attributes.instanceKey ? {} : { 'data-instance-key': attributes.instanceKey },
      },
    }
  },
  parseHTML() { return [{ tag: 'span[data-fallacy-id]' }] },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'fallacy-underline' }), 0]
  },
  addCommands() {
    return {
      setFallacyMark: attributes => ({ commands }) => commands.setMark(this.type, attributes),
      toggleFallacyMark: attributes => ({ commands }) => commands.toggleMark(this.type, attributes),
      unsetFallacyMark: instanceKey => ({ tr, editor, commands }) => {
        if (instanceKey) {
            let removed = false
            tr.doc.nodesBetween(0, tr.doc.content.size, (node, pos) => {
                if (!node.isText) return true
                node.marks.forEach(mark => {
                    if (
                      (mark.type.name === this.type.name) &&
                      (mark.attrs.instanceKey === instanceKey)
                    ) {
                        tr.removeMark(pos, pos + node.nodeSize, this.type)
                        removed = true
                    }
                })
                return !removed
            })

            if (removed) {
                 editor.view.dispatch(tr)
                 return true
            }

            return false
        }

        return commands.unsetMark(this.type)
      },
    }
  },
})
