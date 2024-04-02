-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "lastUpdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PlayerId" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "server" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_guildId_key" ON "Leaderboard"("guildId");
