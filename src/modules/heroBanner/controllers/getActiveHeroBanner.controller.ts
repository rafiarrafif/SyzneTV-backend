import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getActiveHeroBannerService } from "../services/getActiveHeroBanner.service";

export const getActiveHeroBannerController = async (ctx: Context) => {
  try {
    const response = await getActiveHeroBannerService();
    return returnReadResponse(
      ctx.set,
      200,
      "Active hero banners fetched successfully",
      response,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
