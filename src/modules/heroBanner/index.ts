import Elysia from "elysia";
import { getActiveHeroBannerController } from "./controllers/getActiveHeroBanner.controller";

export const heroBannerModule = new Elysia({ prefix: "/hero-banner" }).get(
  "/",
  getActiveHeroBannerController,
);
