/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToRom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Playlist` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_PlaylistToRom_B_index";

-- DropIndex
DROP INDEX "_PlaylistToRom_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "History";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlaylistToRom";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PlaylistEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "romId" TEXT NOT NULL,
    "playlistId" TEXT,
    CONSTRAINT "PlaylistEntry_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Playlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "title" TEXT NOT NULL DEFAULT 'New Playlist',
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Playlist" ("description", "id", "isPublic", "updatedAt", "userId") SELECT "description", "id", "isPublic", "updatedAt", "userId" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
