-- CreateTable
CREATE TABLE "GuildInfo" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaderboardPlayers" INTEGER[],
    "isGreetingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "greetingMessage" TEXT,
    "isCommonRoleEnabled" BOOLEAN NOT NULL DEFAULT false,
    "commonRole" TEXT,

    CONSTRAINT "GuildInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "discord" JSONB NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "Entries" JSONB,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildInfo_guildId_key" ON "GuildInfo"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");
