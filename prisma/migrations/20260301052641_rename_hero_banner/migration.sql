/*
  Warnings:

  - You are about to drop the `HeroBanner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HeroBanner" DROP CONSTRAINT "HeroBanner_creatorId_fkey";

-- DropTable
DROP TABLE "HeroBanner";

-- CreateTable
CREATE TABLE "hero_banner" (
    "id" UUID NOT NULL,
    "isClickable" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(225),
    "description" TEXT,
    "buttonContent" VARCHAR(100),
    "buttonLink" TEXT,
    "imageUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" UUID NOT NULL,

    CONSTRAINT "hero_banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hero_banner" ADD CONSTRAINT "hero_banner_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
