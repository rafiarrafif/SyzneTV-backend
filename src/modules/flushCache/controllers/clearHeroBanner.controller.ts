import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { clearHeroBannerService } from "../services/clearHeroBanner.service";

export const clearHeroBannerController = async (ctx: { set: Context["set"] }) => {
  const cacheCleared = await clearHeroBannerService();
  return returnWriteResponse(ctx.set, 200, "Hero banner cache flushed successfully", cacheCleared);
};
