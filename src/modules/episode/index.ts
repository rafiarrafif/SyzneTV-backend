import Elysia from "elysia";
import { getAllEpisodeFromSpecificMediaController } from "./controllers/getAllEpisodeFromSpecificMedia.controller";
import { getEpisodeDetailsController } from "./controllers/getEpisodeDetails.controller";

export const episodeModule = new Elysia({ prefix: "/episodes/:mediaSlug" })
  .get("/", getAllEpisodeFromSpecificMediaController)
  .get("/:episode", getEpisodeDetailsController);
