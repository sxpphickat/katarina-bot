/*
  Warnings:

  - A unique constraint covering the columns `[guildId]` on the table `CommonUserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommonUserRole_guildId_key" ON "CommonUserRole"("guildId");
