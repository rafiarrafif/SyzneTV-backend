import Elysia from "elysia";
import { bulkInsertEpisodeController } from "./controllers/bulkInsertEpisode.controller";
import { bulkInsertMediaController } from "./controllers/bulkInsertMedia.controller";
import { createVideoServiceInternalController } from "./controllers/createVideoService.controller";
import { bulkInsertVideoController } from "./controllers/bulkInsertVideo.controller";
import { updateAllEpisodeThumbnailController } from "./controllers/updateAllEpisodeThumbnail.controller";
import { purgeUnusedSessionController } from "./controllers/purgeUnusedSession.controller";
import { createHeroBannerController } from "./controllers/createHeroBanner.controller";
import { bulkInsertMediaSchema } from "./schemas/bulkInsertMedia.schema";
import { bulkInsertEpisodeSchema } from "./schemas/bulkInsertEpisode.schema";
import { updateAllEpisodeThumbnailSchema } from "./schemas/updateAllEpisodeThumbnail.schema";
import { bulkInsertVideoSchema } from "./schemas/bulkInsertVideo.schema";
import { createVideoServiceInternalSchema } from "./schemas/createVideoServiceInternal.schema";
import { purgeUnusedSessionSchema } from "./schemas/purgeUnusedSession.schema";
import { createHeroBannerSchema } from "./schemas/createHeroBanner.schema";

export const internalModule = new Elysia({
  prefix: "/internal",
  tags: ["Internal"],
})
  .post("/media/bulk-insert", bulkInsertMediaController, bulkInsertMediaSchema)
  .post("/episode/bulk-insert", bulkInsertEpisodeController, bulkInsertEpisodeSchema)
  .put("/episode/update-thumbnails", updateAllEpisodeThumbnailController, updateAllEpisodeThumbnailSchema)
  .post("/video/bulk-insert", bulkInsertVideoController, bulkInsertVideoSchema)
  .post("/video-service", createVideoServiceInternalController, createVideoServiceInternalSchema)
  .post("/user-session/purge-unused", purgeUnusedSessionController, purgeUnusedSessionSchema)
  .post("/hero-banner", createHeroBannerController, createHeroBannerSchema);
