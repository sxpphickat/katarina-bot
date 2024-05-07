/*
  Warnings:

  - You are about to drop the column `Entries` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "Entries",
ADD COLUMN     "entries" JSONB;
