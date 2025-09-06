/* eslint-disable no-useless-escape */

import { RorschachTerm } from './types'

export const rorschachTermsData: RorschachTerm[] = [
  {
    id: 'woke-001',
    term: 'woke',
    meanings: [
      'The first known meaning is to be "awake" to and aware of unfairness and injustice in society, especially racism. Someone who is "woke" pays attention to the challenges that certain groups of people face.',
      'It can also be used to describe support for fairness and equality. This describes someone who cares about social justice and equal rights for all people. This includes standing up against unfair treatment based on a person\'s race, gender, or background.',
      'It is also sometimes used as a catch-all term to describe concepts like DEI (Diversity, Equity & Inclusion) initiatives, critical race theory, or other socially-driven movements.',
      'Some people use "woke" in a negative way to make fun of others. They use it to describe people or ideas they think are too sensitive, too politically correct, or too easily offended. This use is meant as an insult.',
    ],
    rebuttal: '<p>If you think your opponent is using "woke" as an insult, stay calm and avoid the emotional reaction they\'re after. Calmly redirect the conversation back to the issue, asking them to explain what specific point they disagree with while ignoring the term.</p>',
    recommendation: 'This term can be tricky, and often elicits strong emotions. If you\'re not sure your opponent will know which meaning you\'re using, you may want to skip it and be more specific in how you phrase your argument instead.',
    pattern: '(\\b(woke|wokism|wokist))',
    urls: [
      'https://en.wikipedia.org/wiki/Woke',
      'https://theconversation.com/heres-what-woke-means-and-how-to-respond-to-it-219588',
    ],
  },
  {
    id: 'fake-news-002',
    term: 'fake news',
    meanings: [
      'It can refer to articles, videos, or other content created to deliberately trick people into believing something that isn\'t true. The goal is often to make money through web traffic or to push a specific political agenda.',
      'The term is now frequently used as an attack to discredit news stories that someone doesn\'t like, even if the story is factually correct. Calling a story "fake news" in this way is a tactic to try and convince people not to trust a particular news source, especially if the reporting is critical of a particular person or group.',
      'Sometimes, "fake news" is used as a general term for any kind of low-quality information. This can include stories with honest mistakes, articles with misleading or "clickbait" headlines that don\'t match the story\'s content, or satire that people mistake for the real thing.',
    ],
    rebuttal: '<p></p>',
    recommendation: '<p></p>',
    pattern: '(\\b(fake news))',
    urls: [
      'https://en.wikipedia.org/wiki/Fake_news',
      'https://guides.lib.umich.edu/fakenews',
      'https://www.tradoc.army.mil/social-media-fake-news/',
    ],
  },
]

export const getRorschachTermById = (id: string): RorschachTerm | undefined =>
  rorschachTermsData.find(f => f.id === id)
