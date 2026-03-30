import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getActiveHeroBannerService } from "../services/getActiveHeroBanner.service";
import { getActiveHeroBannerSchema } from "../schemas/getActiveHeroBanner.schema";

export const getActiveHeroBannerController = async (ctx: {
  set: Context["set"];
  header: Static<typeof getActiveHeroBannerSchema.headers>;
}) => {
  try {
    const response = await getActiveHeroBannerService({ cookie: ctx.header?.cookie });
    return returnReadResponse(ctx.set, 200, "Active hero banners fetched successfully", response);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
