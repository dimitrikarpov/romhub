-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaylistsOnUsers" (
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "playlistId"),
    CONSTRAINT "PlaylistsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistsOnUsers_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistsOnUsers" ("assignedAt", "playlistId", "userId") SELECT "assignedAt", "playlistId", "userId" FROM "PlaylistsOnUsers";
DROP TABLE "PlaylistsOnUsers";
ALTER TABLE "new_PlaylistsOnUsers" RENAME TO "PlaylistsOnUsers";
CREATE TABLE "new_PlaylistEntry" (
    "romId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("romId", "playlistId"),
    CONSTRAINT "PlaylistEntry_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistEntry" ("assignedAt", "playlistId", "romId") SELECT "assignedAt", "playlistId", "romId" FROM "PlaylistEntry";
DROP TABLE "PlaylistEntry";
ALTER TABLE "new_PlaylistEntry" RENAME TO "PlaylistEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
