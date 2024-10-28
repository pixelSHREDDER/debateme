-- CreateEnum
CREATE TYPE "DebateStatus" AS ENUM ('Unknown', 'NoOpponent', 'CreatorTurn', 'OpponentTurn', 'CreatorCooldown', 'OpponentCooldown');

-- AlterTable
ALTER TABLE "Debate" ADD COLUMN     "status" "DebateStatus" NOT NULL DEFAULT 'Unknown';
