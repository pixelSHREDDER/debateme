/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Debate` table. All the data in the column will be lost.
  - You are about to drop the column `opponentId` on the `Debate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Turn` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorSub` to the `Debate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSub` to the `Turn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Debate" DROP CONSTRAINT "Debate_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Debate" DROP CONSTRAINT "Debate_opponentId_fkey";

-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_userId_fkey";

-- AlterTable
ALTER TABLE "Debate" DROP COLUMN "creatorId",
DROP COLUMN "opponentId",
ADD COLUMN     "creatorSub" TEXT NOT NULL,
ADD COLUMN     "opponentSub" TEXT;

-- AlterTable
ALTER TABLE "Turn" DROP COLUMN "userId",
ADD COLUMN     "userSub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sub" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- AddForeignKey
ALTER TABLE "Debate" ADD CONSTRAINT "Debate_creatorSub_fkey" FOREIGN KEY ("creatorSub") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debate" ADD CONSTRAINT "Debate_opponentSub_fkey" FOREIGN KEY ("opponentSub") REFERENCES "User"("sub") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;
