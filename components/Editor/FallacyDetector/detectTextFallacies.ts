import { FallacyType } from './constants'
import { logicalFallaciesData } from './fallacies'
import { rorschachTermsData } from './rorschachs'
import { DetectedFallacy } from './types'

export const detectTextFallacies = (text: string): DetectedFallacy[] => {
  const detected: DetectedFallacy[] = []

  logicalFallaciesData.forEach(fallacy => {
    const regex = new RegExp(fallacy.pattern, 'gi')
    const match = regex.exec(text)

    if (match !== null) {
      const from = match.index
      const to = from + match[0].length
      const key = `${from}-${to}-${fallacy.id}`

      if (!detected.some(d => d.key === key)) {
        detected.push({
          type: FallacyType.Logical,
          id: fallacy.id,
          from,
          to,
          text: match[0],
          key,
        })
      }
    }
  })

  rorschachTermsData.forEach(term => {
    const regex = new RegExp(term.pattern, 'gi')
    const match = regex.exec(text)

    if (match !== null) {
      const from = match.index
      const to = from + match[0].length
      const key = `${from}-${to}-${term.id}`

      if (!detected.some(d => d.key === key)) {
        detected.push({
          type: FallacyType.Rorschach,
          id: term.id,
          from,
          to,
          text: match[0],
          key,
        })
      }
    }
  })

  return detected.sort((a, b) => a.from - b.from)
}
