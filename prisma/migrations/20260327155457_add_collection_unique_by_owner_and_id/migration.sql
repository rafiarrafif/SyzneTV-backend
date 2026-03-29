/*
  Warnings:

  - You are about to alter the column `name` on the `collections` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(115)`.
  - A unique constraint covering the columns `[slug,ownerId]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "slug" VARCHAR(115) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(115);

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_ownerId_key" ON "collections"("slug", "ownerId");
