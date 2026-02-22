/*
  Warnings:

  - You are about to drop the column `code` on the `videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId,videoCode]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `videoCode` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "videos_serviceId_code_key";

-- AlterTable
ALTER TABLE "videos"  RENAME COLUMN "code" TO "videoCode";

-- CreateIndex
DROP INDEX IF EXISTS "videos_serviceId_code_key";
CREATE UNIQUE INDEX "videos_serviceId_videoCode_key" ON "videos"("serviceId", "videoCode");
