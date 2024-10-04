import { TTurn } from '@/lib/prisma-types'

// Lorem Ipsum HTML courtesy of https://css-tricks.com/new-site-html-ipsum/

export const createTurns: () => TTurn[] = () => {
  const createdAt = new Date('2024-04-13T12:24:02Z')

  return [
    {
      id: 1,
      body: `
          <p>Didn't melt fairer keepsakes since Fellowship elsewhere.</p>
          <p>Woodlands payment <a href="#">Osgiliath</a> tightening. Barad-dur follow belly comforts tender tough bell? Many that live deserve death. Some that die deserve life. Outwitted teatime grasp defeated before stones reflection corset seen animals Saruman's call?</p>
          <p>Curse you and all the halflings! Deserted anytime Lake-town burned caves balls. Smoked lthilien forbids Thrain? <span style="font-size: 2.0rem">Tad survive ensnare joy mistake courtesy Bagshot Row.</span> Ligulas step drops both? You shall not pass!</p>
          <p>Branch hey-diddle-diddle pony trouble'll sleeping during jump Narsil. <span style="font-size: 0.6rem">North valor overflowing sort Iáve mister kingly money?</span> Tender respectable success Valar impressive unfriendly bloom scraped?</p>
          <ul>
            <li>Adamant.</li>
            <li>Southfarthing!</li>
            <li>Witch-king.</li>
            <li>Precious.</li>
            <li>Gaffer's!</li>
          </ul>
          <ul>
            <li>Excuse tightening yet survives two cover Undómiel city ablaze.</li>
            <li>Keepsakes deeper clouds Buckland position 21 lied bicker fountains ashamed.</li>
            <li>Women rippling cold steps rules Thengel finer.</li>
            <li>Portents close Havens endured irons hundreds handle refused sister?</li>
            <li>Harbor Grubbs fellas riddles afar!</li>
          </ul>
          <p>Ravens wonder wanted runs me crawl gaining lots faster! Khazad-dum surprise baby season ranks. I bid you all a very fond farewell.</p>
          <ol>
            <li>Narsil.</li>
            <li>Elros.</li>
            <li>Arwen Evenstar.</li>
            <li>Maggot's?</li>
            <li>Bagginses?</li>
          </ol>
          <ol>
            <li>Concerning Hobbits l golf air fifth bell prolonging camp.</li>
            <li>Grond humble rods nearest mangler.</li>
            <li>Enormity Lórien merry gravy stayed move.</li>
            <li>Diversion almost notion furs between fierce laboring Nazgûl ceaselessly parent.</li>
            <li>Agree ruling um wasteland Bagshot Row expect sleep.</li>
          </ol>
          <p>Delay freezes Gollum. Let the Ring-bearer decide. Bagshot Row chokes pole pauses immediately orders taught éored musing three-day? Disease rune repel source fire Goblinses already?</p>
          <hr>
          <p>What about second breakfast? Nags runt near Lindir lock discover level? Andûril breathe waited flatten union.</p>
          <blockquote>
            <p>You shall be the Fellowship of the Ring.</p>
            <footer>—Númenor, <cite>sweeter burned verse</cite></footer>
          </blockquote>
          <p>I think we should get off the road. Penalty sight splintered Misty Mountain mithril? Unrest lasts rode league bears absence Bracegirdle athletic contract nice parent slowed?</p>
          <pre>Pardon Concerning Hobbits rune goblins? Twitching figure including rightful Thorin's level! Worth tubers threats Hornburg deadliest? Unfold thumping shh wants Homely!</pre>
          <hr>`,
      debateId: 1,
      createdAt,
      userSub: 'auth0|1234567890abcdefghij1234',
      },
      {
        id: 2,
        body: `
          <p>Didn't melt fairer keepsakes since Fellowship elsewhere.</p>
          <p>Woodlands payment <a href="#">Osgiliath</a> tightening. Barad-dur follow belly comforts tender tough bell? Many that live deserve death. Some that die deserve life. Outwitted teatime grasp defeated before stones reflection corset seen animals Saruman's call?</p>
          <p><span style="font-size: 2.0rem">Tad survive ensnare joy mistake courtesy Bagshot Row.</span></p>
          <p>Ligulas step drops both? You shall not pass! Tender respectable success Valar impressive unfriendly bloom scraped? Branch hey-diddle-diddle pony trouble'll sleeping during jump Narsil.</p>
          <p><span style="font-size: 0.6rem">North valor overflowing sort Iáve mister kingly money?</span></p>
          <p>Curse you and all the halflings! Deserted anytime Lake-town burned caves balls. Smoked lthilien forbids Thrain?</p>
          <ul>
            <li>Adamant.</li>
            <li>Southfarthing!</li>
            <li>Witch-king.</li>
            <li>Precious.</li>
            <li>Gaffer's!</li>
          </ul>
          <ul>
            <li>Excuse tightening yet survives two cover Undómiel city ablaze.</li>
            <li>Keepsakes deeper clouds Buckland position 21 lied bicker fountains ashamed.</li>
            <li>Women rippling cold steps rules Thengel finer.</li>
            <li>Portents close Havens endured irons hundreds handle refused sister?</li>
            <li>Harbor Grubbs fellas riddles afar!</li>
          </ul>
          <p>Ravens wonder wanted runs me crawl gaining lots faster! Khazad-dum surprise baby season ranks. I bid you all a very fond farewell.</p>
          <ol>
            <li>Narsil.</li>
            <li>Elros.</li>
            <li>Arwen Evenstar.</li>
            <li>Maggot's?</li>
            <li>Bagginses?</li>
          </ol>
          <ol>
            <li>Concerning Hobbits l golf air fifth bell prolonging camp.</li>
            <li>Grond humble rods nearest mangler.</li>
            <li>Enormity Lórien merry gravy stayed move.</li>
            <li>Diversion almost notion furs between fierce laboring Nazgûl ceaselessly parent.</li>
            <li>Agree ruling um wasteland Bagshot Row expect sleep.</li>
          </ol>
          <p>Delay freezes Gollum. Let the Ring-bearer decide. Bagshot Row chokes pole pauses immediately orders taught éored musing three-day? Disease rune repel source fire Goblinses already?</p>
          <hr>
          <p>What about second breakfast? Nags runt near Lindir lock discover level? Andûril breathe waited flatten union.</p>
          <blockquote>
            <p>You shall be the Fellowship of the Ring.</p>
            <footer>—Númenor, <cite>sweeter burned verse</cite></footer>
          </blockquote>
          <p>I think we should get off the road. Penalty sight splintered Misty Mountain mithril? Unrest lasts rode league bears absence Bracegirdle athletic contract nice parent slowed?</p>
          <pre>Pardon Concerning Hobbits rune goblins? Twitching figure including rightful Thorin's level! Worth tubers threats Hornburg deadliest? Unfold thumping shh wants Homely!</pre>`,
        debateId: 1,
        createdAt,
        userSub: 'auth0|abcdefghij1234567890abcd',
        },
    ] as const
  }
