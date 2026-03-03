/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `system_preferences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "system_preferences_key_key" ON "system_preferences"("key");
