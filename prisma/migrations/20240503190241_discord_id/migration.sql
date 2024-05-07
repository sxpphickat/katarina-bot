/*
  Warnings:

  - You are about to drop the column `discord` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "discord",
ADD COLUMN     "discordId" TEXT;
