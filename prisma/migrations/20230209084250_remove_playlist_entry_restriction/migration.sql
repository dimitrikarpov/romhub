/*
  Warnings:

  - The primary key for the `PlaylistEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `PlaylistEntry` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaylistEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "romId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlaylistEntry_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistEntry" ("assignedAt", "playlistId", "romId") SELECT "assignedAt", "playlistId", "romId" FROM "PlaylistEntry";
DROP TABLE "PlaylistEntry";
ALTER TABLE "new_PlaylistEntry" RENAME TO "PlaylistEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
