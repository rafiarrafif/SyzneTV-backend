/*
  Warnings:

  - A unique constraint covering the columns `[embed_url]` on the table `media_trailers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "media_trailers_embed_url_key" ON "media_trailers"("embed_url");
