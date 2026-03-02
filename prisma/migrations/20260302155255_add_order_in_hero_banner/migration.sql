/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `hero_banner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "hero_banner" ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "hero_banner_order_key" ON "hero_banner"("order");
