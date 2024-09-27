import { theme } from '@/theme'
import { Alert } from '@mantine/core'
import quotesStyles from './Quotes.module.css'

const quotes = [
  '“In order to think through things clearly, we need other opinions and viewpoints in order to navigate into the nuance. We need civil debate to present opposing viewpoints and point out our blind spots. We need the ability to speak freely and civilly to one another.” ― Eric Overby, Legacy',
  '“Citizenship is not a spectator sport.” ― Steve Miska',
  '“Grace, respect, reserve, and empathetic listening are qualities sorely missing from the public discourse now.” ― Meryl Streep',
  '“Civilized discourse demands critical thinking, self-reflexiveness, sober-headed analysis.” ―  Daniel Lubetzky',
  '“I’m not shy about heated debate or passionate discourse, but when people get crazy or rude, that’s a buzz kill. There’s got to be a better code of conduct, some basic etiquette.” ― Mos Def',
  '“Where wise actions are the fruit of life, wise discourse is the pollination.” ― Bryant H. McGill',
  '“The public discourse online is not done through the polite language of debate.” ― Hozier',
  '“A vital democracy requires an informed electorate, civil discourse, and bold thinking.” ― Jane O’Meara Sanders',
  '“I think it is very difficult today to have a reasoned public discourse on any controversial subject. Certainly, election years present a complicating factor.” ― John Poindexter',
  '“Three things in human life are important: The first is to be kind. The second is to be kind, and the third is to be kind.” ― Henry James',
  '“We have a choice about how we behave, and that means we have the choice to opt for civility and grace.” ― Dwight Currie',
  '“Every action done in company ought to be with some sign of respect to those that are present.” ― George Washington',
  '“Be civil to all, sociable to many, familiar with few, friend to one, enemy to none.” ― Benjamin Franklin',
  '“Civility costs nothing, and buys everything.” ― Mary Wortley Montagu',
  '“As citizens we have to be more thoughtful and more educated and more informed. I turn on the TV and I see these grown people screaming at each other, and I think, well, if we don’t get our civility back we’re in trouble.” ― Emmylou Harris',
  '“When once the forms of civility are violated, there remains little hope of return to kindness or decency.” ― Samuel Johnson',
  '“Never be cruel. Never be cowardly. Hate is always foolish. Love is always wise. Always try to be nice, but never fail to be kind.” ― The Doctor',
  '“In times of stress, the best thing we can do for each other is to listen with our ears and our hearts and to be assured that our questions are just as important as our answers.” ― Fred Rogers',
  '“Forgiveness is a strange thing. It can sometimes be easier to forgive our enemies than our friends. It can be hardest of all to forgive people we love.” ― Fred Rogers',
  '“It’s very dramatic when two people come together to work something out. It’s easy to take a gun and annihilate your opposition, but what is really exciting to me is to see people with differing views come together and finally respect each other.” ― Fred Rogers',
  '“Love and trust, in the space between what’s said and what’s heard in our life, can make all the difference in the world. ” ― Fred Rogers',
  '“Emotional contagion is very real, so once one person gets heated up, it’s easy to mirror that behavior and before you know it, you have two people swinging punches.” ― Amy Gallo',
  '“Don’t react, respond.” ― Unknown',
  '“Be excellent to each other.” ― Keanu Reeves',
  '“Don’t be a dick.” ― Unknown',
]

export default function Quotes() {
  return (
  <Alert
    className={quotesStyles.quotes}
    component="aside"
    variant="outline"
    fs="italic"
    p={6}
    color={theme.colors?.purple?.[4] || 'purple'}
    radius="md"
    w="auto"
    maw="75%">
    {quotes[Math.floor(Math.random() * quotes.length)]}
  </Alert>
  )
}
