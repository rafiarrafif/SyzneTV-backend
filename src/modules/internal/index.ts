import Elysia, { t } from "elysia";
import { bulkInsertEpisodeController } from "./controllers/bulkInsertEpisode.controller";
import { bulkInsertMediaController } from "./controllers/bulkInsertMedia.controller";
import { createVideoServiceInternalController } from "./controllers/createVideoService.controller";
import { bulkInsertVideoController } from "./controllers/bulkInsertVideo.controller";
import { updateAllEpisodeThumbnailController } from "./controllers/updateAllEpisodeThumbnail.controller";
import { purgeUnusedSessionController } from "./controllers/purgeUnusedSession.controller";
import { createHeroBannerController } from "./controllers/createHeroBanner.controller";
import { bulkInsertMediaSchema } from "./schemas/bulkInsertMedia.schema";

export const internalModule = new Elysia({
  prefix: "/internal",
  tags: ["Internal"],
})
  .post("/media/bulk-insert", bulkInsertMediaController, bulkInsertMediaSchema)
  .post("/episode/bulk-insert", bulkInsertEpisodeController)
  .put("/episode/update-thumbnails", updateAllEpisodeThumbnailController)
  .post("/video/bulk-insert", bulkInsertVideoController)
  .post("/video-service", createVideoServiceInternalController)
  .post("/user-session/purge-unused", purgeUnusedSessionController)
  .post("/hero-banner", createHeroBannerController);
