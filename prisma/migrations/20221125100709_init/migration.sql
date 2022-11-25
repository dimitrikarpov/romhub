-- CreateTable
CREATE TABLE "Rom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "description" TEXT,
    "crc32" TEXT NOT NULL,
    "sha1" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "images" TEXT
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rom_sha1_key" ON "Rom"("sha1");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
