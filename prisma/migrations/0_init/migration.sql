-- CreateTable
CREATE TABLE "Debate" (
    "id" SERIAL NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Debate_pkey" PRIMARY KEY ("id")
);

