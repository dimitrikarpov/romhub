/*
  Warnings:

  - You are about to drop the column `userId` on the `Playlist` table. All the data in the column will be lost.
  - The primary key for the `PlaylistEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `PlaylistEntry` table. All the data in the column will be lost.
  - You are about to drop the column `foo` on the `PlaylistEntry` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PlaylistEntry` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PlaylistsOnUsers" (
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "playlistId"),
    CONSTRAINT "PlaylistsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistsOnUsers_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Playlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Playlist" ("description", "id", "isPublic", "title", "type", "updatedAt") SELECT "description", "id", "isPublic", "title", "type", "updatedAt" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
CREATE TABLE "new_PlaylistEntry" (
    "romId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("romId", "playlistId"),
    CONSTRAINT "PlaylistEntry_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistEntry" ("playlistId", "romId") SELECT "playlistId", "romId" FROM "PlaylistEntry";
DROP TABLE "PlaylistEntry";
ALTER TABLE "new_PlaylistEntry" RENAME TO "PlaylistEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
