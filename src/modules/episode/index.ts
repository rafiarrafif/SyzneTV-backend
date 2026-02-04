import Elysia from "elysia";
import { getAllEpisodeFromSpecificMediaController } from "./controllers/getAllEpisodeFromSpecificMedia.controller";

export const episodeModule = new Elysia({ prefix: "/episodes/:mediaSlug" }).get(
  "/",
  getAllEpisodeFromSpecificMediaController,
);
