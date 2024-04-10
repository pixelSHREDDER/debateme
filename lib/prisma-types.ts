import { Prisma, Debate, Turn } from '@prisma/client';

export type TDebate = Debate &
  Partial<Prisma.DebateGetPayload<{ include: { turn: true } }>>

export type TTurn = Turn &
  Partial<Prisma.TurnGetPayload<{ include: { debate: true } }>>