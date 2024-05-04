import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@prisma.io',
  },
  {
    email: 'nilu@prisma.io',
  },
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
          id: users[0].id,
        },
      },
      opponent: {
        connect: {
          id: users[1].id,
        },
      },
      topic: 'Fool me once',
    },
    {
      creator: {
        connect: {
          id: users[1].id,
        },
      },
      opponent: {
        connect: {
          id: users[0].id,
        },
      },
      topic: 'Join the Prisma Discord',
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
          email: 'alice@prisma.io',
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
          email: 'nilu@prisma.io',
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
          email: 'alice@prisma.io',
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
          email: 'alice@prisma.io',
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