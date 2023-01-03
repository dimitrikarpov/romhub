-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "romId" TEXT NOT NULL,
    "romName" TEXT NOT NULL,
    "romPlatform" TEXT NOT NULL,
    "image" TEXT,
    "userId" TEXT NOT NULL,
    "playedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
