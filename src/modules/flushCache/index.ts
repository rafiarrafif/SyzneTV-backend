import Elysia from "elysia";
import { clearHeroBannerController } from "./controllers/clearHeroBanner.controller";

export const flushCacheModule = new Elysia({ prefix: "/flush-cache" }).put("/hero-banner", clearHeroBannerController);
