import { DebateStatus } from '@prisma/client'

export default function useUserStatus() {
  const isItYourCooldown = (
    creatorSub: string,
    opponentSub: string | null,
    status: DebateStatus,
    userSub: string
  ) => {
    if (opponentSub === null) {
      return false
    }

    return (
      (userSub === creatorSub) &&
      (status === DebateStatus.OpponentCooldown)
    ) || (
      (userSub === opponentSub) &&
      (status === DebateStatus.CreatorCooldown)
    )
  }

  const isItYourTurn = (
    creatorSub: string,
    opponentSub: string | null,
    status: DebateStatus,
    userSub: string
  ) => {
    if (opponentSub === null) {
      return false
    }

    return (
      (userSub === creatorSub) &&
      (status === DebateStatus.CreatorTurn)
    ) || (
      (userSub === opponentSub) &&
      (status === DebateStatus.OpponentTurn)
    )
  }

  return { isItYourCooldown, isItYourTurn }
}
