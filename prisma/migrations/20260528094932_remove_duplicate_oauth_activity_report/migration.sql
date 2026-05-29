/*
  Warnings:

  - You are about to drop the column `last_login` on the `user_oauth_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_oauth_accounts" DROP COLUMN "last_login";
