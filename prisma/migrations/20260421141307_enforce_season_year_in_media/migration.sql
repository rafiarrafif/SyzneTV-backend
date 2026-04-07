/*
  Warnings:

  - Made the column `season` on table `medias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearReleased` on table `medias` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "medias" ALTER COLUMN "season" SET NOT NULL,
ALTER COLUMN "yearReleased" SET NOT NULL;
