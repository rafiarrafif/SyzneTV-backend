import Elysia from "elysia";
import { getAllMediaController } from "./controllers/getAllMedia.controller";
import { getMediaBySlugController } from "./controllers/getMediaBySlug.controller";
import { getMediaBySlugSchema } from "./schemas/getMediaBySlug.schema";

export const mediaModule = new Elysia({ prefix: "/media" })
  .get("/", getAllMediaController)
  .get("/:slug", getMediaBySlugController, getMediaBySlugSchema);
