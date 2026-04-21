import Elysia from "elysia";
import { getAllMediaController } from "./controllers/getAllMedia.controller";
import { getMediaBySlugController } from "./controllers/getMediaBySlug.controller";
import { getMediaBySlugSchema } from "./schemas/getMediaBySlug.schema";
import { getAllMediaSchema } from "./schemas/getAllMedia.schema";

export const mediaModule = new Elysia({ prefix: "/media", tags: ["Media"] })
  .get("/", getAllMediaController, getAllMediaSchema)
  .get("/:slug", getMediaBySlugController, getMediaBySlugSchema);
