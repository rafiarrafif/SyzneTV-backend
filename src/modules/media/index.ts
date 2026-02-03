import Elysia from "elysia";
import { getAllMediaController } from "./controllers/getAllMedia.controller";

export const mediaModule = new Elysia({ prefix: "/media" }).get(
  "/",
  getAllMediaController,
);
