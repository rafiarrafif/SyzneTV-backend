/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `countries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");
