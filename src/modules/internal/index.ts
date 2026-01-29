import Elysia from "elysia";
import { bulkInsertAnimeController } from "./controllers/bulkInsertAnime.controller";
import { bulkInsertEpisodeController } from "./controllers/bulkInsertEpisode.controller";

export const internalModule = new Elysia({ prefix: "/internal" })
  .post("/media/bulk-insert", bulkInsertAnimeController)
  .post("/episode/bulk-insert", bulkInsertEpisodeController);
