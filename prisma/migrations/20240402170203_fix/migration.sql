/*
  Warnings:

  - You are about to drop the column `PlayerId` on the `Player` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "server" TEXT NOT NULL
);
INSERT INTO "new_Player" ("gameName", "id", "server", "summonerId", "tagLine") SELECT "gameName", "id", "server", "summonerId", "tagLine" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
