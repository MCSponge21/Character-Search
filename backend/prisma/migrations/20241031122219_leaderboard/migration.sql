-- CreateTable
CREATE TABLE "leaderboard" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);
