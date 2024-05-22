import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'jennyfer.renner47078@excellent-parser.name',
    sub: 'auth0|6635d49d275a3f8f52dbf13e'
  },
  {
    email: 'ronald.swanson90210@excellent-parser.name',
    sub: 'auth0|66481e16bfb70c6924743524'
  }
]

async function main() {
  const users = []
  const debates = []
  const turns = []
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
    users.push(user)
  }

  const debateData: Prisma.DebateCreateInput[] = [
    {
      creator: {
        connect: {
          sub: users[0].sub,
        },
      },
      opponent: {
        connect: {
          sub: users[1].sub,
        },
      },
      topic: 'Fool me once',
    },
    {
      creator: {
        connect: {
          sub: users[1].sub,
        },
      },
      opponent: {
        connect: {
          sub: users[0].sub,
        },
      },
      topic: 'Parks & Recreation: Yes or No?',
    },
  ]

  for (const d of debateData) {
    const debate = await prisma.debate.create({
      data: d,
    })
    console.log(`Created debate with id: ${debate.id}`)
    debates.push(debate)
  }

  const turnData: Prisma.TurnCreateInput[] = [
    {
      debate: {
        connect: {
          id: debates[0].id,
        },
      },
      user: {
        connect: {
          sub: users[0].sub,
        },
      },
      body: 'Shame on you',
    },
    {
      debate: {
        connect: {
          id: debates[0].id,
        },
      },
      user: {
        connect: {
          sub: users[1].sub,
        },
      },
      body: 'Fool me twice',
    },
    {
      debate: {
        connect: {
          id: debates[0].id,
        },
      },
      user: {
        connect: {
          sub: users[0].sub,
        },
      },
      body: 'Shame on glue',
    },
    {
      debate: {
        connect: {
          id: debates[1].id,
        },
      },
      user: {
        connect: {
          sub: users[0].sub,
        },
      },
      body: 'Lorem Ipsum',
    }
  ]

  for (const t of turnData) {
    const turn = await prisma.turn.create({
      data: t,
    })
    console.log(`Created turn with id: ${turn.id}`)
    turns.push(turn)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })