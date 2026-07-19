import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createHomeMediaBannerSchema } from "../schemas/createHomeMediaBanner.schema";
import { createHomeMediaBannerService } from "../services/http/createHomeMediaBanner.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const createHomeMediaBannerController = async (ctx: {
  set: Context["set"];
  body: Static<typeof createHomeMediaBannerSchema.body>;
}) => {
  try {
    const createdHomeMediaBanner = await createHomeMediaBannerService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Media banner added successfully", createdHomeMediaBanner);
  } catch (e) {
    return mainErrorHandler(ctx.set, e);
  }
};
