/*
  Warnings:

  - Added the required column `valid_until` to the `user_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_sessions" ADD COLUMN     "valid_until" TIMESTAMPTZ NOT NULL;
