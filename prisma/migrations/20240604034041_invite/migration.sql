-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "debateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_debateId_key" ON "Invite"("debateId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
