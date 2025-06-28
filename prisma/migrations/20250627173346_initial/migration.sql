/*
  Warnings:

  - You are about to drop the column `commentPicture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "commentPicture",
DROP COLUMN "profilePicture",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "commentBackground" TEXT;
