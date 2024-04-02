/*
  Warnings:

  - A unique constraint covering the columns `[PlayerId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_PlayerId_key" ON "Player"("PlayerId");
