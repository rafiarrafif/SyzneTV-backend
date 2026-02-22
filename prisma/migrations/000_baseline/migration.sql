-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('TV', 'ONA', 'OVA', 'Movie', 'Special', 'Music');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('Japanese', 'English', 'Indonesia', 'Korea');

-- CreateEnum
CREATE TYPE "CharacterRole" AS ENUM ('Main', 'Supporting');

-- CreateEnum
CREATE TYPE "MediaOperation" AS ENUM ('create', 'update', 'delete');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "AdultFiltering" AS ENUM ('hide', 'show', 'explicit');

-- CreateEnum
CREATE TYPE "AdultAlert" AS ENUM ('hide', 'show');

-- CreateEnum
CREATE TYPE "VideoQuality" AS ENUM ('Q2160', 'Q1440', 'Q1080', 'Q720', 'Q480', 'Q360', 'Q240', 'Q144');

-- CreateEnum
CREATE TYPE "UserNotificationState" AS ENUM ('info', 'warning', 'danger');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('pending', 'resolved', 'rejected');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('sexualize', 'violent', 'explicit', 'hateful', 'political', 'racist', 'spam', 'other');

-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('private', 'selected', 'protected', 'public');

-- CreateEnum
CREATE TYPE "AccessScope" AS ENUM ('viewer', 'editor');

-- CreateEnum
CREATE TYPE "MediaReviewReaction" AS ENUM ('angry', 'sad', 'awesome', 'happy', 'sleepy', 'annoyed', 'disgusting', 'disappointed');

-- CreateEnum
CREATE TYPE "EmailPorpose" AS ENUM ('forgot_password', 'account_activation', 'account_notification', 'subscribtion');

-- CreateEnum
CREATE TYPE "TypeSystemNotification" AS ENUM ('component', 'popup', 'toast');

-- CreateTable
CREATE TABLE "medias" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "titleAlternative" JSONB NOT NULL,
    "slug" TEXT NOT NULL,
    "malId" INTEGER,
    "pictureMedium" TEXT NOT NULL,
    "pictureLarge" TEXT NOT NULL,
    "country" "Country" NOT NULL DEFAULT 'Japanese',
    "score" DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    "status" TEXT NOT NULL,
    "startAiring" TIMESTAMP(3),
    "endAiring" TIMESTAMP(3),
    "synopsis" TEXT NOT NULL,
    "ageRating" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "source" TEXT,
    "onDraft" BOOLEAN NOT NULL DEFAULT true,
    "uploadedBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_logs" (
    "id" UUID NOT NULL,
    "status" "MediaOperation" NOT NULL,
    "approval" BOOLEAN NOT NULL DEFAULT false,
    "proposedBy" UUID NOT NULL,
    "approvedBy" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "malId" INTEGER NOT NULL,
    "malUrl" VARCHAR(255) NOT NULL,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studios" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "linkAbout" TEXT NOT NULL,
    "malId" INTEGER NOT NULL,
    "logoUrl" TEXT,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" UUID NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" "CharacterRole" NOT NULL,
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "smallImageUrl" TEXT,
    "creatorId" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_actors" (
    "id" UUID NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "description" TEXT,
    "aboutUrl" TEXT,
    "imageUrl" TEXT,
    "websiteUrl" TEXT,
    "creatorId" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voice_actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lang_va_char" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "vaId" UUID NOT NULL,
    "charId" UUID NOT NULL,
    "creatorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lang_va_char_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "episode" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "score" DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    "pictureThumbnail" TEXT,
    "viewed" BIGINT NOT NULL DEFAULT 0,
    "likes" BIGINT NOT NULL DEFAULT 0,
    "dislikes" BIGINT NOT NULL DEFAULT 0,
    "pendingUpload" BOOLEAN NOT NULL DEFAULT true,
    "uploadedBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode_likes" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "episodeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "episode_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "episodeId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "pendingUpload" BOOLEAN NOT NULL DEFAULT true,
    "uploadedBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_services" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "logo" TEXT,
    "hexColor" VARCHAR(10) NOT NULL,
    "endpointVideo" TEXT NOT NULL,
    "endpointThumbnail" TEXT,
    "endpointDownload" TEXT,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATE,
    "gender" "UserGender",
    "phoneCC" INTEGER,
    "phoneNumber" INTEGER,
    "bioProfile" TEXT,
    "avatar" TEXT,
    "commentBackground" TEXT,
    "provider" VARCHAR(255),
    "providerId" VARCHAR(255),
    "providerToken" TEXT,
    "providerPayload" JSON,
    "verifiedAt" TIMESTAMP(3),
    "disabledAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "langPreference" TEXT,
    "adultFiltering" "AdultFiltering" NOT NULL DEFAULT 'hide',
    "adultAlert" "AdultAlert" NOT NULL DEFAULT 'show',
    "videoQuality" "VideoQuality" NOT NULL DEFAULT 'Q1080',
    "serviceDefaultId" UUID,
    "hideContries" "Country"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "primaryColor" VARCHAR(10),
    "secondaryColor" VARCHAR(10),
    "pictureImage" TEXT,
    "badgeImage" TEXT,
    "isSuperadmin" BOOLEAN NOT NULL DEFAULT false,
    "canEditMedia" BOOLEAN NOT NULL DEFAULT false,
    "canManageMedia" BOOLEAN NOT NULL DEFAULT false,
    "canEditEpisodes" BOOLEAN NOT NULL DEFAULT false,
    "canManageEpisodes" BOOLEAN NOT NULL DEFAULT false,
    "canEditComment" BOOLEAN NOT NULL DEFAULT false,
    "canManageComment" BOOLEAN NOT NULL DEFAULT false,
    "canEditUser" BOOLEAN NOT NULL DEFAULT false,
    "canManageUser" BOOLEAN NOT NULL DEFAULT false,
    "canEditSystem" BOOLEAN NOT NULL DEFAULT false,
    "canManageSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role_assignments" (
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "assignmentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_role_assignments_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "user_notifications" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "state" "UserNotificationState" NOT NULL,
    "ctaLink" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "isReaded" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" UUID NOT NULL,
    "isAuthenticated" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "deviceType" VARCHAR(255) NOT NULL,
    "deviceOs" VARCHAR(255) NOT NULL,
    "deviceIp" VARCHAR(255) NOT NULL,
    "browser" VARCHAR(255) NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastOnline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_logs" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ownerId" UUID NOT NULL,
    "accessStatus" "AccessStatus" NOT NULL DEFAULT 'private',
    "password" VARCHAR(255),
    "accessScope" "AccessScope" NOT NULL DEFAULT 'viewer',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch_histories" (
    "id" UUID NOT NULL,
    "episodeId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watch_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_reviews" (
    "id" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "reaction" "MediaReviewReaction" NOT NULL,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "episodeId" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "isParent" BOOLEAN NOT NULL DEFAULT false,
    "parentId" UUID,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "id" UUID NOT NULL,
    "commentId" UUID NOT NULL,
    "userLiked" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_reports" (
    "id" UUID NOT NULL,
    "userReporter" UUID NOT NULL,
    "commentReported" UUID NOT NULL,
    "isSupervisorReport" BOOLEAN NOT NULL DEFAULT false,
    "reason" "ReportReason" NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "approvedBy" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "countryFlag" VARCHAR(10) NOT NULL,
    "fileLocation" TEXT NOT NULL,
    "craetedBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_system_accounts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "host" VARCHAR(255) NOT NULL,
    "port" INTEGER NOT NULL,
    "secure" BOOLEAN NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "purpose" "EmailPorpose" NOT NULL,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_system_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_system_histories" (
    "id" UUID NOT NULL,
    "purpose" "EmailPorpose" NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "toEmail" TEXT NOT NULL,
    "userRelated" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_system_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_preferences" (
    "id" UUID NOT NULL,
    "key" VARCHAR(225) NOT NULL,
    "value" VARCHAR(225) NOT NULL,
    "description" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_notifications" (
    "id" UUID NOT NULL,
    "type" "TypeSystemNotification" NOT NULL,
    "componentName" VARCHAR(255),
    "popupImage" TEXT,
    "titleToast" VARCHAR(255),
    "contentToast" TEXT,
    "createdBy" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_logs" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "notes" TEXT NOT NULL,
    "relatedUser" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediaStudios" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MediaStudios_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MediaGenres" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MediaGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserFavoriteGenres" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserFavoriteGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MediaCharacters" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MediaCharacters_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MediaCollections" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MediaCollections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserSelectedSharingCollention" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UserSelectedSharingCollention_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_slug_key" ON "medias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "medias_malId_key" ON "medias"("malId");

-- CreateIndex
CREATE INDEX "medias_status_onDraft_deletedAt_idx" ON "medias"("status", "onDraft", "deletedAt");

-- CreateIndex
CREATE INDEX "medias_mediaType_idx" ON "medias"("mediaType");

-- CreateIndex
CREATE INDEX "medias_uploadedBy_idx" ON "medias"("uploadedBy");

-- CreateIndex
CREATE INDEX "medias_createdAt_idx" ON "medias"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "genres_malId_key" ON "genres"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "studios_slug_key" ON "studios"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "studios_malId_key" ON "studios"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "characters_malId_key" ON "characters"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "voice_actors_malId_key" ON "voice_actors"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "lang_va_char_language_vaId_charId_key" ON "lang_va_char"("language", "vaId", "charId");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_mediaId_episode_key" ON "episodes"("mediaId", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "videos_serviceId_code_key" ON "videos"("serviceId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "video_services_name_key" ON "video_services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_providerId_key" ON "users"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "user_roles"("name");

-- CreateIndex
CREATE INDEX "user_sessions_userId_isAuthenticated_deletedAt_idx" ON "user_sessions"("userId", "isAuthenticated", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "email_system_accounts_name_key" ON "email_system_accounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "email_system_accounts_email_key" ON "email_system_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_system_accounts_username_key" ON "email_system_accounts"("username");

-- CreateIndex
CREATE INDEX "_MediaStudios_B_index" ON "_MediaStudios"("B");

-- CreateIndex
CREATE INDEX "_MediaGenres_B_index" ON "_MediaGenres"("B");

-- CreateIndex
CREATE INDEX "_UserFavoriteGenres_B_index" ON "_UserFavoriteGenres"("B");

-- CreateIndex
CREATE INDEX "_MediaCharacters_B_index" ON "_MediaCharacters"("B");

-- CreateIndex
CREATE INDEX "_MediaCollections_B_index" ON "_MediaCollections"("B");

-- CreateIndex
CREATE INDEX "_UserSelectedSharingCollention_B_index" ON "_UserSelectedSharingCollention"("B");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_logs" ADD CONSTRAINT "media_logs_proposedBy_fkey" FOREIGN KEY ("proposedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_logs" ADD CONSTRAINT "media_logs_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_logs" ADD CONSTRAINT "media_logs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genres" ADD CONSTRAINT "genres_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studios" ADD CONSTRAINT "studios_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_actors" ADD CONSTRAINT "voice_actors_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lang_va_char" ADD CONSTRAINT "lang_va_char_vaId_fkey" FOREIGN KEY ("vaId") REFERENCES "voice_actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lang_va_char" ADD CONSTRAINT "lang_va_char_charId_fkey" FOREIGN KEY ("charId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lang_va_char" ADD CONSTRAINT "lang_va_char_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_likes" ADD CONSTRAINT "episode_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_likes" ADD CONSTRAINT "episode_likes_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "user_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_likes" ADD CONSTRAINT "episode_likes_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "video_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_services" ADD CONSTRAINT "video_services_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_langPreference_fkey" FOREIGN KEY ("langPreference") REFERENCES "languages"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_serviceDefaultId_fkey" FOREIGN KEY ("serviceDefaultId") REFERENCES "video_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "user_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_histories" ADD CONSTRAINT "watch_histories_id_fkey" FOREIGN KEY ("id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_histories" ADD CONSTRAINT "watch_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_histories" ADD CONSTRAINT "watch_histories_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "user_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_reviews" ADD CONSTRAINT "movie_reviews_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_reviews" ADD CONSTRAINT "movie_reviews_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_userLiked_fkey" FOREIGN KEY ("userLiked") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_userReporter_fkey" FOREIGN KEY ("userReporter") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_craetedBy_fkey" FOREIGN KEY ("craetedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_system_accounts" ADD CONSTRAINT "email_system_accounts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_system_histories" ADD CONSTRAINT "email_system_histories_userRelated_fkey" FOREIGN KEY ("userRelated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_notifications" ADD CONSTRAINT "system_notifications_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_relatedUser_fkey" FOREIGN KEY ("relatedUser") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaStudios" ADD CONSTRAINT "_MediaStudios_A_fkey" FOREIGN KEY ("A") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaStudios" ADD CONSTRAINT "_MediaStudios_B_fkey" FOREIGN KEY ("B") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaGenres" ADD CONSTRAINT "_MediaGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaGenres" ADD CONSTRAINT "_MediaGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteGenres" ADD CONSTRAINT "_UserFavoriteGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteGenres" ADD CONSTRAINT "_UserFavoriteGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaCharacters" ADD CONSTRAINT "_MediaCharacters_A_fkey" FOREIGN KEY ("A") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaCharacters" ADD CONSTRAINT "_MediaCharacters_B_fkey" FOREIGN KEY ("B") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaCollections" ADD CONSTRAINT "_MediaCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaCollections" ADD CONSTRAINT "_MediaCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSelectedSharingCollention" ADD CONSTRAINT "_UserSelectedSharingCollention_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSelectedSharingCollention" ADD CONSTRAINT "_UserSelectedSharingCollention_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

