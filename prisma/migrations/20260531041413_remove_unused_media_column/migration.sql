/*
  Warnings:

  - You are about to drop the column `approver_id` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `medias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medias" DROP COLUMN "approver_id",
DROP COLUMN "created_by_id";
