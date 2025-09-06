export const FOUND_FALLACY_PREFIXES = [
  'Careful!',
  'Watch out!',
  'Whoa now!',
  'Easy there.',
  '*blows whistle* Time out!!',
  'Hang on.',
  'Whoops!',
]

export const ANSWER_PREFIXES = [
  'Try this:',
  'Hm.. How about:',
  'What about:',
  'Hm....',
  'Lemme think....',
  'Good question!',
  'That&apos;s a good question....',
]

export const RORSCHACH_MEANINGS_PREFIX = 'A popular word or phrase whose meaning changes depending on who uses it. Sometimes these meanings even contradict each other! Here are some of the common ways people use '
export const RORSCHACH_RECOMMENDATION_PREFIX = '<p>Try to make sure you and your opponent are using this term in the same way, or else you may end up arguing right past each other!</p>'

export enum FallacyType {
  Logical = 'Logical',
  Rorschach = 'Rorschach',
}

export enum LogicalModalContentType {
  Description = 'description',
  Rebuttal = 'rebuttal',
  Recommendation = 'recommendation',
}

export enum RorschachModalContentType {
  Meanings = 'meanings',
  Rebuttal = 'rebuttal',
  Recommendation = 'recommendation',
}
