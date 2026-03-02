/*
  Warnings:

  - You are about to drop the column `order` on the `hero_banner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderPriority]` on the table `hero_banner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "hero_banner_order_key";

-- AlterTable
ALTER TABLE "hero_banner" DROP COLUMN "order",
ADD COLUMN     "orderPriority" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "hero_banner_orderPriority_key" ON "hero_banner"("orderPriority");
