/*
  Warnings:

  - Added the required column `playersArray` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leaderboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "lastUpdate" DATETIME NOT NULL,
    "playersArray" TEXT NOT NULL
);
INSERT INTO "new_Leaderboard" ("guildId", "id", "lastUpdate") SELECT "guildId", "id", "lastUpdate" FROM "Leaderboard";
DROP TABLE "Leaderboard";
ALTER TABLE "new_Leaderboard" RENAME TO "Leaderboard";
CREATE UNIQUE INDEX "Leaderboard_guildId_key" ON "Leaderboard"("guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
