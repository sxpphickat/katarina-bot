/*
  Warnings:

  - Added the required column `guildId` to the `CommonUserRole` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CommonUserRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_CommonUserRole" ("id", "name") SELECT "id", "name" FROM "CommonUserRole";
DROP TABLE "CommonUserRole";
ALTER TABLE "new_CommonUserRole" RENAME TO "CommonUserRole";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
