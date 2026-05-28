-- DropForeignKey
ALTER TABLE "user_preferences" DROP CONSTRAINT "user_preferences_char_as_partner_id_fkey";

-- AlterTable
ALTER TABLE "user_oauth_accounts" ALTER COLUMN "provider_token" SET DATA TYPE TEXT,
ALTER COLUMN "refresh_token" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_preferences" ALTER COLUMN "char_as_partner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_char_as_partner_id_fkey" FOREIGN KEY ("char_as_partner_id") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
