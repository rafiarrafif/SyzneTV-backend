import Elysia from "elysia";
import { bulkInsertEpisodeController } from "./controllers/bulkInsertEpisode.controller";
import { bulkInsertMediaController } from "./controllers/bulkInsertMedia.controller";
import { createVideoServiceInternalController } from "./controllers/createVideoService.controller";
import { bulkInsertVideoController } from "./controllers/bulkInsertVideo.controller";
import { updateAllEpisodeThumbnailController } from "./controllers/updateAllEpisodeThumbnail.controller";

export const internalModule = new Elysia({ prefix: "/internal" })
  .post("/media/bulk-insert", bulkInsertMediaController)
  .post("/episode/bulk-insert", bulkInsertEpisodeController)
  .put("/episode/update-thumbnails", updateAllEpisodeThumbnailController)
  .post("/video/bulk-insert", bulkInsertVideoController)
  .post("/video-service", createVideoServiceInternalController);
