/*
  Warnings:

  - You are about to drop the `_MediaCollections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MediaCollections" DROP CONSTRAINT "_MediaCollections_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaCollections" DROP CONSTRAINT "_MediaCollections_B_fkey";

-- DropTable
DROP TABLE "_MediaCollections";

-- CreateTable
CREATE TABLE "CollectionMedia" (
    "id" UUID NOT NULL,
    "collectionId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionMedia_collectionId_mediaId_key" ON "CollectionMedia"("collectionId", "mediaId");

-- AddForeignKey
ALTER TABLE "CollectionMedia" ADD CONSTRAINT "CollectionMedia_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionMedia" ADD CONSTRAINT "CollectionMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
