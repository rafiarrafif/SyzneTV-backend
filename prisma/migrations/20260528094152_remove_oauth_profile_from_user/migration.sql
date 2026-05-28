/*
  Warnings:

  - You are about to drop the column `auth_provider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `provider_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth_provider",
DROP COLUMN "provider_token";
