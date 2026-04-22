/*
  Warnings:

  - The values [Winter,Spring,Summer,Fall] on the enum `Season` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Season_new" AS ENUM ('winter', 'spring', 'summer', 'fall');
ALTER TABLE "medias" ALTER COLUMN "season" TYPE "Season_new" USING ("season"::text::"Season_new");
ALTER TYPE "Season" RENAME TO "Season_old";
ALTER TYPE "Season_new" RENAME TO "Season";
DROP TYPE "public"."Season_old";
COMMIT;
