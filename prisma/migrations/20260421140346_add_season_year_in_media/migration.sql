-- CreateEnum
CREATE TYPE "Season" AS ENUM ('Winter', 'Spring', 'Summer', 'Fall');

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "season" "Season",
ADD COLUMN     "yearReleased" SMALLINT;
