import Elysia from "elysia";
import { bulkInsertEpisodeController } from "./controllers/bulkInsertEpisode.controller";
import { bulkInsertMediaController } from "./controllers/bulkInsertMedia.controller";

export const internalModule = new Elysia({ prefix: "/internal" })
  .post("/media/bulk-insert", bulkInsertMediaController)
  .post("/episode/bulk-insert", bulkInsertEpisodeController);
