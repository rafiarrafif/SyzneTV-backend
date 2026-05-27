-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'contributor', 'curator', 'admin');

-- CreateEnum
CREATE TYPE "user_sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "auth_provider" AS ENUM ('google', 'github');

-- CreateEnum
CREATE TYPE "device_type" AS ENUM ('mobile', 'tablet', 'desktop', 'unknown');

-- CreateEnum
CREATE TYPE "user_preference_state" AS ENUM ('exclude', 'include');

-- CreateEnum
CREATE TYPE "media_season" AS ENUM ('winter', 'spring', 'summer', 'fall');

-- CreateEnum
CREATE TYPE "character_role" AS ENUM ('main', 'supporting', 'background');

-- CreateEnum
CREATE TYPE "status_submission" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "like_type" AS ENUM ('like', 'dislike');

-- CreateEnum
CREATE TYPE "audit_action" AS ENUM ('delete', 'restore', 'edit', 'flag');

-- CreateEnum
CREATE TYPE "privacy_level" AS ENUM ('public', 'unlisted', 'private');

-- CreateEnum
CREATE TYPE "collection_access_level" AS ENUM ('owner', 'moderator', 'contributor', 'viewer');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255),
    "username" VARCHAR(28) NOT NULL,
    "fullname" VARCHAR(32) NOT NULL,
    "avatar" VARCHAR(255),
    "bio" TEXT,
    "datebirth" DATE,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "sex" "user_sex",
    "phone_number" VARCHAR(20),
    "auth_provider" VARCHAR(64),
    "provider_token" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "countryId" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "user_id" UUID NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "coordinate" VARCHAR(50),
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_oauth_accounts" (
    "id" UUID NOT NULL,
    "provider_name" "auth_provider" NOT NULL,
    "provider_sub" VARCHAR(255),
    "provider_email" VARCHAR(255),
    "provider_token" VARCHAR(255),
    "refresh_token" VARCHAR(255),
    "expires_at" TIMESTAMPTZ,
    "last_login" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_oauth_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" UUID NOT NULL,
    "device_type" "device_type" NOT NULL,
    "os_type" VARCHAR(50),
    "os_version" VARCHAR(50),
    "browser_name" VARCHAR(50),
    "browser_version" VARCHAR(50),
    "ip_login" INET,
    "login_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logout_at" TIMESTAMPTZ,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "comment_picture" VARCHAR(255),
    "enable_watch_history" BOOLEAN NOT NULL DEFAULT true,
    "enable_search_history" BOOLEAN NOT NULL DEFAULT false,
    "is_private_account" BOOLEAN NOT NULL DEFAULT false,
    "can_message_me" BOOLEAN NOT NULL DEFAULT true,
    "publish_birthday" BOOLEAN NOT NULL DEFAULT false,
    "publish_email" BOOLEAN NOT NULL DEFAULT false,
    "publish_phone_number" BOOLEAN NOT NULL DEFAULT false,
    "publish_country" BOOLEAN NOT NULL DEFAULT false,
    "publish_partner" BOOLEAN NOT NULL DEFAULT true,
    "subscribe_to_newsletter" BOOLEAN NOT NULL DEFAULT true,
    "enable_security_alerts" BOOLEAN NOT NULL DEFAULT true,
    "user_id" UUID NOT NULL,
    "char_as_partner_id" UUID NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_genre_preferences" (
    "state" "user_preference_state" NOT NULL,
    "user_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,

    CONSTRAINT "user_genre_preferences_pkey" PRIMARY KEY ("user_id","genre_id")
);

-- CreateTable
CREATE TABLE "user_rating_preferences" (
    "state" "user_preference_state" NOT NULL,
    "user_id" UUID NOT NULL,
    "rating_id" UUID NOT NULL,

    CONSTRAINT "user_rating_preferences_pkey" PRIMARY KEY ("user_id","rating_id")
);

-- CreateTable
CREATE TABLE "user_country_preferences" (
    "state" "user_preference_state" NOT NULL,
    "user_id" UUID NOT NULL,
    "country_id" UUID NOT NULL,

    CONSTRAINT "user_country_preferences_pkey" PRIMARY KEY ("user_id","country_id")
);

-- CreateTable
CREATE TABLE "user_follows" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "user_watch_histories" (
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,
    "episode_id" UUID NOT NULL,

    CONSTRAINT "user_watch_histories_pkey" PRIMARY KEY ("user_id","episode_id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "code" VARCHAR(12),
    "cover_url" VARCHAR(255),
    "privacy" "privacy_level" NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_members" (
    "access_level" "collection_access_level" NOT NULL,
    "invited_at" TIMESTAMPTZ,
    "collection_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "invited_by_id" UUID,

    CONSTRAINT "collection_members_pkey" PRIMARY KEY ("collection_id","user_id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" UUID NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "title_secondary" VARCHAR(255),
    "title_original" VARCHAR(255),
    "title_synonyms" VARCHAR(255)[],
    "synopsis" TEXT,
    "small_image_url" VARCHAR(255),
    "medium_image_url" VARCHAR(255) NOT NULL,
    "large_image_url" VARCHAR(255),
    "airing" BOOLEAN NOT NULL,
    "start_airing" DATE,
    "end_airing" DATE,
    "score" DECIMAL(2,2),
    "score_total" INTEGER NOT NULL DEFAULT 0,
    "score_count" INTEGER NOT NULL DEFAULT 0,
    "background" TEXT,
    "season" "media_season" NOT NULL,
    "year" SMALLINT,
    "broadcast_day" VARCHAR(20),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "type_id" UUID NOT NULL,
    "source_id" UUID NOT NULL,
    "status_id" UUID NOT NULL,
    "age_rating_id" UUID,
    "country_id" UUID,
    "approver_id" UUID,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "deleted_by_id" UUID,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_submissions" (
    "id" UUID NOT NULL,
    "status" "status_submission" NOT NULL DEFAULT 'pending',
    "reviewed_at" TIMESTAMPTZ,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "media_id" UUID NOT NULL,
    "submitter_id" UUID NOT NULL,
    "reviewer_id" UUID,

    CONSTRAINT "media_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_collections" (
    "added_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "media_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "added_by_id" UUID NOT NULL,

    CONSTRAINT "media_collections_pkey" PRIMARY KEY ("media_id","collection_id")
);

-- CreateTable
CREATE TABLE "media_trailers" (
    "media_id" UUID NOT NULL,
    "url" VARCHAR(255),
    "embed_url" VARCHAR(255),
    "small_image_url" VARCHAR(255),
    "large_image_url" VARCHAR(255),
    "maximum_image_url" VARCHAR(255),

    CONSTRAINT "media_trailers_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "media_types" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "media_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_sources" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "media_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_statuses" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "media_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_age_ratings" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "min_age" SMALLINT NOT NULL,

    CONSTRAINT "media_age_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_producers" (
    "media_id" UUID NOT NULL,
    "producer_id" UUID NOT NULL,

    CONSTRAINT "media_producers_pkey" PRIMARY KEY ("media_id","producer_id")
);

-- CreateTable
CREATE TABLE "media_licensors" (
    "media_id" UUID NOT NULL,
    "licensor_id" UUID NOT NULL,

    CONSTRAINT "media_licensors_pkey" PRIMARY KEY ("media_id","licensor_id")
);

-- CreateTable
CREATE TABLE "media_studios" (
    "media_id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,

    CONSTRAINT "media_studios_pkey" PRIMARY KEY ("media_id","studio_id")
);

-- CreateTable
CREATE TABLE "producers" (
    "id" UUID NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "type" VARCHAR(24) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_genres" (
    "media_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,

    CONSTRAINT "media_genres_pkey" PRIMARY KEY ("media_id","genre_id")
);

-- CreateTable
CREATE TABLE "media_explicit_genres" (
    "media_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,

    CONSTRAINT "media_explicit_genres_pkey" PRIMARY KEY ("media_id","genre_id")
);

-- CreateTable
CREATE TABLE "media_themes" (
    "media_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,

    CONSTRAINT "media_themes_pkey" PRIMARY KEY ("media_id","genre_id")
);

-- CreateTable
CREATE TABLE "media_demographics" (
    "media_id" UUID NOT NULL,
    "demographic_id" UUID NOT NULL,

    CONSTRAINT "media_demographics_pkey" PRIMARY KEY ("media_id","demographic_id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" UUID NOT NULL,
    "mal_id" SMALLINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(115) NOT NULL,
    "thumbnail_url" VARCHAR(255),

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_relations" (
    "relation_type" VARCHAR(50) NOT NULL,
    "media_id" UUID NOT NULL,
    "related_media_id" UUID NOT NULL,

    CONSTRAINT "media_relations_pkey" PRIMARY KEY ("media_id","related_media_id")
);

-- CreateTable
CREATE TABLE "media_external_links" (
    "id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "site_name" VARCHAR(100),
    "media_id" UUID NOT NULL,

    CONSTRAINT "media_external_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_characters" (
    "id" UUID NOT NULL,
    "role" "character_role" NOT NULL,
    "media_id" UUID NOT NULL,
    "character_id" UUID NOT NULL,

    CONSTRAINT "media_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "small_image" VARCHAR(255),
    "mal_id" INTEGER,
    "fanpage_url" VARCHAR(255),
    "liked" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_actors" (
    "id" UUID NOT NULL,
    "media_character_id" UUID NOT NULL,
    "language" VARCHAR(115) NOT NULL,
    "staff_id" UUID NOT NULL,

    CONSTRAINT "voice_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "mal_id" INTEGER,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" UUID NOT NULL,
    "media_id" UUID NOT NULL,
    "episode" SMALLINT NOT NULL,
    "mal_url" VARCHAR(255),
    "forum_url" VARCHAR(255),
    "title" VARCHAR(155) NOT NULL,
    "title_origin" VARCHAR(155),
    "title_romanji" VARCHAR(155),
    "aired_at" DATE,
    "filler" BOOLEAN NOT NULL,
    "recap" BOOLEAN NOT NULL,
    "total_score" INTEGER NOT NULL DEFAULT 0,
    "score_count" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "video_code" VARCHAR(255) NOT NULL,
    "short_code" VARCHAR(255),
    "thumbnail_code" VARCHAR(255),
    "download_code" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "episode_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_submissions" (
    "video_id" UUID NOT NULL,
    "status" "status_submission" NOT NULL DEFAULT 'pending',
    "reviewed_at" TIMESTAMPTZ,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID NOT NULL,
    "reviewer_id" UUID,

    CONSTRAINT "video_submissions_pkey" PRIMARY KEY ("video_id")
);

-- CreateTable
CREATE TABLE "video_services" (
    "id" UUID NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "resolution" SMALLINT NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),
    "hex_color" VARCHAR(10),
    "endpoint_video" VARCHAR(255) NOT NULL,
    "endpoint_short" VARCHAR(255),
    "endpoint_image" VARCHAR(255),
    "endpoint_download" VARCHAR(255),
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_service_submissions" (
    "video_service_id" UUID NOT NULL,
    "status" "status_submission" NOT NULL DEFAULT 'pending',
    "reviewed_at" TIMESTAMPTZ,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID NOT NULL,
    "reviewer_id" UUID,

    CONSTRAINT "video_service_submissions_pkey" PRIMARY KEY ("video_service_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "user_id" UUID NOT NULL,
    "episode_id" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "user_id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "type" "like_type" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("user_id","comment_id")
);

-- CreateTable
CREATE TABLE "comment_audit_logs" (
    "id" UUID NOT NULL,
    "action" "audit_action" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment_id" UUID NOT NULL,
    "performed_by_id" UUID NOT NULL,

    CONSTRAINT "comment_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_reports" (
    "id" UUID NOT NULL,
    "title" VARCHAR(115) NOT NULL,
    "status" "status_submission" NOT NULL,
    "description" TEXT,
    "reported_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMPTZ,
    "reporter_id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,

    CONSTRAINT "comment_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisioned_users" (
    "provisioned_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" VARCHAR(255),
    "admin_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "provisioned_users_pkey" PRIMARY KEY ("admin_id","user_id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "slug" VARCHAR(165) NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "flag" VARCHAR(255),
    "banner" VARCHAR(255),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_media_banners" (
    "id" UUID NOT NULL,
    "priority" SMALLINT NOT NULL,
    "start_show" DATE NOT NULL,
    "end_show" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "media_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "home_media_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VideoToVideoService" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_VideoToVideoService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "medias_mal_id_key" ON "medias"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_submissions_media_id_key" ON "media_submissions"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_types_name_key" ON "media_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "media_sources_name_key" ON "media_sources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "media_statuses_name_key" ON "media_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "media_age_ratings_name_key" ON "media_age_ratings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producers_mal_id_key" ON "producers"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "genres_mal_id_key" ON "genres"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "characters_mal_id_key" ON "characters"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_mal_id_key" ON "staff"("mal_id");

-- CreateIndex
CREATE INDEX "episodes_media_id_episode_idx" ON "episodes"("media_id", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "video_services_name_resolution_key" ON "video_services"("name", "resolution");

-- CreateIndex
CREATE UNIQUE INDEX "home_media_banners_priority_key" ON "home_media_banners"("priority");

-- CreateIndex
CREATE INDEX "_VideoToVideoService_B_index" ON "_VideoToVideoService"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_char_as_partner_id_fkey" FOREIGN KEY ("char_as_partner_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_genre_preferences" ADD CONSTRAINT "user_genre_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_preferences"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_genre_preferences" ADD CONSTRAINT "user_genre_preferences_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rating_preferences" ADD CONSTRAINT "user_rating_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_preferences"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rating_preferences" ADD CONSTRAINT "user_rating_preferences_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "media_age_ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_country_preferences" ADD CONSTRAINT "user_country_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_preferences"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_country_preferences" ADD CONSTRAINT "user_country_preferences_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_watch_histories" ADD CONSTRAINT "user_watch_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_watch_histories" ADD CONSTRAINT "user_watch_histories_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_members" ADD CONSTRAINT "collection_members_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_members" ADD CONSTRAINT "collection_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_members" ADD CONSTRAINT "collection_members_invited_by_id_fkey" FOREIGN KEY ("invited_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "media_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "media_sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "media_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_age_rating_id_fkey" FOREIGN KEY ("age_rating_id") REFERENCES "media_age_ratings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_submissions" ADD CONSTRAINT "media_submissions_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_submissions" ADD CONSTRAINT "media_submissions_submitter_id_fkey" FOREIGN KEY ("submitter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_submissions" ADD CONSTRAINT "media_submissions_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collections" ADD CONSTRAINT "media_collections_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collections" ADD CONSTRAINT "media_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collections" ADD CONSTRAINT "media_collections_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_trailers" ADD CONSTRAINT "media_trailers_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_producers" ADD CONSTRAINT "media_producers_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_producers" ADD CONSTRAINT "media_producers_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_licensors" ADD CONSTRAINT "media_licensors_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_licensors" ADD CONSTRAINT "media_licensors_licensor_id_fkey" FOREIGN KEY ("licensor_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_studios" ADD CONSTRAINT "media_studios_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_studios" ADD CONSTRAINT "media_studios_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producers" ADD CONSTRAINT "producers_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_explicit_genres" ADD CONSTRAINT "media_explicit_genres_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_explicit_genres" ADD CONSTRAINT "media_explicit_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_themes" ADD CONSTRAINT "media_themes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_themes" ADD CONSTRAINT "media_themes_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_demographics" ADD CONSTRAINT "media_demographics_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_demographics" ADD CONSTRAINT "media_demographics_demographic_id_fkey" FOREIGN KEY ("demographic_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_relations" ADD CONSTRAINT "media_relations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_relations" ADD CONSTRAINT "media_relations_related_media_id_fkey" FOREIGN KEY ("related_media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_external_links" ADD CONSTRAINT "media_external_links_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_characters" ADD CONSTRAINT "media_characters_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_characters" ADD CONSTRAINT "media_characters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_actors" ADD CONSTRAINT "voice_actors_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_actors" ADD CONSTRAINT "voice_actors_media_character_id_fkey" FOREIGN KEY ("media_character_id") REFERENCES "media_characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_submissions" ADD CONSTRAINT "video_submissions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_submissions" ADD CONSTRAINT "video_submissions_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_submissions" ADD CONSTRAINT "video_submissions_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_service_submissions" ADD CONSTRAINT "video_service_submissions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_service_submissions" ADD CONSTRAINT "video_service_submissions_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_service_submissions" ADD CONSTRAINT "video_service_submissions_video_service_id_fkey" FOREIGN KEY ("video_service_id") REFERENCES "video_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_audit_logs" ADD CONSTRAINT "comment_audit_logs_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_audit_logs" ADD CONSTRAINT "comment_audit_logs_performed_by_id_fkey" FOREIGN KEY ("performed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provisioned_users" ADD CONSTRAINT "provisioned_users_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provisioned_users" ADD CONSTRAINT "provisioned_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_media_banners" ADD CONSTRAINT "home_media_banners_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_media_banners" ADD CONSTRAINT "home_media_banners_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToVideoService" ADD CONSTRAINT "_VideoToVideoService_A_fkey" FOREIGN KEY ("A") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToVideoService" ADD CONSTRAINT "_VideoToVideoService_B_fkey" FOREIGN KEY ("B") REFERENCES "video_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
