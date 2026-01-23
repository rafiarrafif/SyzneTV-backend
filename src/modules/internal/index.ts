import Elysia from "elysia";
import { bulkInsertAnimeController } from "./controllers/bulkInsertAnime.controller";

export const internalModule = new Elysia({ prefix: "/internal" }).post(
  "/media/bulk-insert",
  bulkInsertAnimeController,
);
