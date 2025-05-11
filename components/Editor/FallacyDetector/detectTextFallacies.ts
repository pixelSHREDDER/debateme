import { logicalFallaciesData } from './fallacies'

export interface DetectedFallacy {
  id: string
  from: number
  to: number
  text: string
  key: string
}

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
          id: fallacy.id,
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
