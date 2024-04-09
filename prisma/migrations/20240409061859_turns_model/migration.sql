-- CreateTable
CREATE TABLE "Turn" (
    "id" SERIAL NOT NULL,
    "body" JSONB,
    "debateId" INTEGER NOT NULL,

    CONSTRAINT "Turn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
