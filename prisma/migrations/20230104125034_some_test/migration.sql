-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaylistEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foo" TEXT DEFAULT 'bar',
    "romId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    CONSTRAINT "PlaylistEntry_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistEntry_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistEntry" ("id", "playlistId", "romId") SELECT "id", "playlistId", "romId" FROM "PlaylistEntry";
DROP TABLE "PlaylistEntry";
ALTER TABLE "new_PlaylistEntry" RENAME TO "PlaylistEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
