/*
  Warnings:

  - You are about to drop the column `buttonContent` on the `hero_banner` table. All the data in the column will be lost.
  - You are about to drop the column `buttonLink` on the `hero_banner` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `hero_banner` table. All the data in the column will be lost.
  - You are about to drop the column `isClickable` on the `hero_banner` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `hero_banner` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `hero_banner` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `hero_banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hero_banner" DROP COLUMN "buttonContent",
DROP COLUMN "buttonLink",
DROP COLUMN "description",
DROP COLUMN "isClickable",
DROP COLUMN "tags",
DROP COLUMN "title",
ADD COLUMN     "mediaId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "hero_banner" ADD CONSTRAINT "hero_banner_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
