import { Prisma, Debate, Turn, User } from '@prisma/client'

export type TDebate = Debate &
  Partial<Prisma.DebateGetPayload<{ include: { turn: true } }>>

export type TTurn = Turn &
  Partial<Prisma.TurnGetPayload<{ include: { debate: true } }>>

export type TUserDebates = User &
  Partial<Prisma.UserGetPayload<{ include: {
    debatesCreated: true,
    debatesOpposed: true
  } }>>
