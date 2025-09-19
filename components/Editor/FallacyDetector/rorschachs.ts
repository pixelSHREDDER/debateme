/* eslint-disable no-useless-escape */

import { RorschachTerm } from './types'

export const rorschachTermsData: RorschachTerm[] = [
  {
    id: 'woke',
    term: 'woke',
    meanings: [
      'The first known meaning is to be "awake" to and aware of unfairness and injustice in society, especially racism. Someone who is "woke" pays attention to the challenges that certain groups of people face.',
      'It can also mean support for fairness and equality. Here, "woke" describes someone who cares about social justice and equal rights for all people. This includes standing up against unfair treatment based on a person\'s race, gender, or background.',
      'It\'s also sometimes used as a catch-all term to describe concepts like DEI (Diversity, Equity & Inclusion) initiatives, critical race theory, or other socially-driven movements.',
      'Some people use "woke" in a negative way to make fun of others. They use it to describe people or ideas they think are too sensitive, too politically correct, or too easily offended. This use is meant as an insult.',
    ],
    rebuttal: '<p>If you think your opponent is using "woke" as an insult, stay calm and avoid the emotional reaction they\'re after. Calmly redirect the conversation back to the issue, asking them to explain what specific point they disagree with while ignoring the term.</p>',
    recommendation: '<p>Using “woke” without saying what you mean can hide the real issue. Naming the specific policy or behavior keeps the conversation fair and focused.</p>',
    pattern: '(\\b(woke|woki))',
    urls: [
      'https://en.wikipedia.org/wiki/Woke',
      'https://theconversation.com/heres-what-woke-means-and-how-to-respond-to-it-219588',
      'https://www.britannica.com/story/what-does-woke-mean',
      'https://www.bbc.com/news/explainers-54780688',
    ],
  },
  {
    id: 'fake-news',
    term: 'fake news',
    meanings: [
      'It can refer to articles, videos, or other content created to deliberately trick people into believing something that isn\'t true. The goal is often to make money through web traffic or to push a specific political agenda.',
      'The term is now frequently used as an attack to discredit news stories that someone doesn\'t like, even if the story is factually correct. Calling a story "fake news" in this way is a tactic to try and convince people not to trust a particular news source, especially if the reporting is critical of a particular person or group.',
      'Sometimes it\'s used as a general term for any kind of low-quality information. This can include stories with honest mistakes, articles with misleading or "clickbait" headlines that don\'t match the story\'s content, or satire that people mistake for the real thing.',
    ],
    rebuttal: '<p>Ask which story or claim is being called “fake” and why. Check facts by looking at reliable sources and original reports.</p>',
    recommendation: '<p>Calling something “fake” without details shuts down fact-checking. Pointing to a specific story and why it’s wrong helps everyone learn.</p>',
    pattern: '(\\b(fake news))',
    urls: [
      'https://en.wikipedia.org/wiki/Fake_news',
      'https://guides.lib.umich.edu/fakenews',
      'https://www.tradoc.army.mil/social-media-fake-news/',
      'https://www.bbc.com/news/reality_check',
      'https://www.pewresearch.org/short-reads/2018/06/18/distinguishing-between-factual-and-opinion-statements-in-the-news/',
    ],
  },
  {
    id: 'maga',
    term: 'MAGA',
    meanings: [
      'An acronym for "Make America Great Again", the central slogan for Donald Trump\'s 2016 presidential campaign. It\'s often used as a call to return to a time in the US that supporters view as more prosperous, powerful, and traditional.',
      'Sometimes it\'s used more broadly to describe the politics of Donald Trump\'s most ardent supporters. This meaning represents a specific set of beliefs, often including an "America First" policy on trade and foreign affairs, strict immigration laws, and a general distrust of established political institutions and media.',
      'Political opponents use it as a critical or negative label. Critics argue that the slogan looks back to a past that was not "great" for many minority groups and women. This meaning is associated with policies and rhetoric that opponents consider divisive, nationalistic, or harmful to democratic principles.',
    ],
    rebuttal: '<p>If someone says “MAGA,” ask whether they mean the slogan, certain policies, or a group of supporters. Discuss the specific idea, not just the label.</p>',
    recommendation: '<p>“MAGA” can mean a slogan, policies, or a group. Clarifying which one you mean prevents arguments about labels instead of ideas.</p>',
    pattern: '(\\b(maga))',
    urls: [
      'https://en.wikipedia.org/wiki/Make_America_Great_Again',
      'https://apnews.com/hub/donald-trump',
      'https://www.britannica.com/biography/Donald-Trump',
    ],
  },
  {
    id: 'antifa',
    term: 'Antifa',
    meanings: [
      'A loose movement of people who oppose fascism and racism (not one official group).',
      'Used by supporters to describe community defense against far‑right groups.',
      'Used by critics to label violent or extreme left‑wing protesters.',
    ],
    rebuttal: '<p>Ask whether they’re talking about the general idea of opposing fascism or a specific event. Focus on the concrete actions and their impacts.</p>',
    recommendation: '<p>This label mixes a broad idea (anti‑fascism) with actions by different people. Talk about specific events and harms to avoid unfair generalizations.</p>',
    pattern: '(\\b(antifa))',
    urls: [
      'https://en.wikipedia.org/wiki/Antifa',
      'https://www.britannica.com/topic/antifa',
      'https://apnews.com/article/antifa-explained-02f0f5f9a76da86e9f5d2f7b8d3a0a5e',
    ],
  },
  {
    id: 'fascism',
    term: 'Fascism',
    meanings: [
      'A political system where one leader or party has very strong control over people’s lives.',
      'Used to describe real 1900s dictatorships (like Mussolini’s Italy).',
      'Used as an insult to call very strict or unfair behavior “fascist.”',
    ],
    rebuttal: '<p>If someone calls something “fascist,” ask which rules or actions they mean and why those are harmful. Talk about real examples, not just strong words.</p>',
    recommendation: '<p>Using “fascist” as an all‑purpose insult weakens your point. Pointing to concrete rules and their effects invites better debate.</p>',
    pattern: '(\\b(fascis))',
    urls: [
      'https://en.wikipedia.org/wiki/Fascism',
      'https://www.britannica.com/topic/fascism',
      'https://www.bbc.co.uk/bitesize/guides/z2c2pv4/revision/1',
    ],
  },
  {
    id: 'nazi',
    term: 'Nazi',
    meanings: [
      'A member of Hitler’s party that ruled Germany in the 1930s–40s.',
      'Used historically when talking about World War II and the Holocaust.',
      'Used today as a harsh insult for someone seen as extremely hateful.',
    ],
    rebuttal: '<p>Calling someone a “Nazi” is very extreme. Ask for specific actions or statements that support the claim, or use more accurate words.</p>',
    recommendation: '<p>“Nazi” is an extreme term tied to real historical harm. Use precise language so serious claims don’t get ignored as exaggeration.</p>',
    pattern: '(\\b(nazi))',
    urls: [
      'https://en.wikipedia.org/wiki/Nazism',
      'https://www.britannica.com/topic/Nazism',
      'https://encyclopedia.ushmm.org/content/en/article/nazism',
    ],
  },
  {
    id: 'hitler',
    term: 'Hitler',
    meanings: [
      'Refers to Adolf Hitler, the dictator of Nazi Germany.',
      'Used in history when discussing World War II and the Holocaust.',
      'Used in arguments as an extreme comparison that often shuts down debate.',
    ],
    rebuttal: '<p>Comparing someone to Hitler is an extreme claim and can shut down discussion. Ask to focus on the specific issue with reasons and evidence.</p>',
    recommendation: '<p>Comparing someone to Hitler can end discussion fast. Focus on the policy or action you’re criticizing to keep the talk productive.</p>',
    pattern: '(\\b(hitler))',
    urls: [
      'https://en.wikipedia.org/wiki/Adolf_Hitler',
      'https://www.britannica.com/biography/Adolf-Hitler',
      'https://encyclopedia.ushmm.org/content/en/article/adolf-hitler',
    ],
  },
  {
    id: 'radical-left-right',
    term: 'Radical Left/Right',
    meanings: [
      'Used to describe very extreme liberal (left) or conservative (right) ideas.',
      'Used by opponents as a warning label to make a side sound dangerous.',
      'Used by supporters to show they want big, fast changes.',
    ],
    rebuttal: '<p>Ask which policy is being called “radical” and why. Discuss likely results and trade‑offs instead of relying on labels.</p>',
    recommendation: '<p>“Radical” is a label, not an argument. Naming the exact change and its trade‑offs helps people evaluate it fairly.</p>',
    pattern: '(\\b(radical\\sleft|radical\\sright))',
    urls: [
      'https://en.wikipedia.org/wiki/Far-left_politics',
      'https://en.wikipedia.org/wiki/Far-right_politics',
      'https://www.britannica.com/topic/left-right-politics',
      'https://www.bbc.co.uk/bitesize/guides/zt7g87h/revision/1',
    ],
  },
  {
    id: 'the-left-right',
    term: 'The Left/Right',
    meanings: [
      'Short way to talk about people with mostly liberal (“the left”) or conservative (“the right”) views.',
      'Used in news and politics to group parties, voters, and ideas.',
      'Used as a shortcut that can unfairly lump very different people together.',
    ],
    rebuttal: '<p>Ask who exactly they mean—a person, group, or policy. Avoid blaming a whole side when the issue is about a specific idea.</p>',
    recommendation: '<p>Broad team labels hide important differences. Talking about a specific idea or person makes solutions easier to find.</p>',
    pattern: '(\\b(the\\sleft|the\\sright))',
    urls: [
      'https://en.wikipedia.org/wiki/Left-wing_politics',
      'https://en.wikipedia.org/wiki/Right-wing_politics',
      'https://www.britannica.com/topic/left',
      'https://www.britannica.com/topic/right-politics',
    ],
  },
  {
    id: 'dei',
    term: 'DEI',
    meanings: [
      'Stands for Diversity, Equity, and Inclusion programs at schools or workplaces.',
      'Used by supporters to promote fairness and belonging for all kinds of people.',
      'Used by critics to claim these programs are unfair or lower standards.',
    ],
    rebuttal: '<p>Ask which DEI policy they mean and how it works. Look for real outcomes and evidence, not just slogans.</p>',
    recommendation: '<p>DEI means different things in different places. Looking at goals and outcomes (not slogans) makes the conversation concrete and fair.</p>',
    pattern: '(\\b(dei))',
    urls: [
      'https://en.wikipedia.org/wiki/Diversity,_equity,_and_inclusion',
      'https://www.shrm.org/resourcesandtools/hr-topics/behavioral-competencies/global-and-cultural-effectiveness/pages/what-is-dei.aspx',
      'https://hbr.org/2020/11/what-is-dei',
    ],
  },
  {
    id: 'mainstream-media',
    term: 'Mainstream Media',
    meanings: [
      'Big, well‑known news outlets like major TV networks and newspapers.',
      'Used neutrally to mean “large traditional news sources.”',
      'Used negatively to suggest those outlets are biased or not truthful.',
    ],
    rebuttal: '<p>Ask for a specific story or source and what is wrong with it. It’s easier to check facts when you discuss one report at a time.</p>',
    recommendation: '<p>Trust is earned article by article. Discussing a specific report makes it possible to check facts instead of debating brands.</p>',
    pattern: '(\\b(mainstream\\smedia))',
    urls: [
      'https://en.wikipedia.org/wiki/Mainstream_media',
      'https://en.wikipedia.org/wiki/News_media',
      'https://www.britannica.com/topic/mass-media',
      'https://www.pewresearch.org/topic/news-habits-media/',
    ],
  },
  {
    id: 'the-media',
    term: 'The Media',
    meanings: [
      'A general term for news organizations and journalists as a whole.',
      'Used to talk about TV, radio, newspapers, podcasts, and websites together.',
      'Used to blame “all media” instead of naming specific sources.',
    ],
    rebuttal: '<p>“The media” is a big group. Ask which outlet or article they mean, and discuss that example.</p>',
    recommendation: '<p>“The media” is not one voice. Naming the outlet and the story avoids blaming everyone for one mistake.</p>',
    pattern: '(\\b(the\\smedia))',
    urls: [
      'https://en.wikipedia.org/wiki/News_media',
      'https://en.wikipedia.org/wiki/Mass_media',
      'https://www.britannica.com/topic/news-media',
      'https://www.pbs.org/education/blog/what-is-media-literacy',
    ],
  },
  {
    id: 'tds',
    term: 'TDS (Trump Derangement Syndrome)',
    meanings: [
      'Used by Trump supporters to say critics have an irrational or extreme negative reaction to Donald Trump.',
      'Used by critics to describe how some supporters dismiss all criticism by calling it “TDS.”',
      'Sometimes used as a quick insult that shuts down discussion instead of addressing the actual claim.',
    ],
    rebuttal: '<p>If someone says “TDS,” ask which specific claim or behavior they mean. Focus on the facts and reasons rather than labels.</p>',
    recommendation: '<p>Labels like “TDS” can stop useful conversation. Discuss the concrete point—what happened, why it matters, and what evidence supports it.</p>',
    pattern: '(\\b(tds|trump\s+derangement\s+syndrome))',
    urls: [
      'https://en.wikipedia.org/wiki/Derangement_syndrome',
      'https://apnews.com/hub/donald-trump',
    ],
  },
]

export const getRorschachTermById = (id: string): RorschachTerm | undefined =>
  rorschachTermsData.find(f => f.id === id)
