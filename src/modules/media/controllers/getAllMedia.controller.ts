import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getAllMediaService } from "../services/http/getAllMedia.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getAllMediaSchema } from "../schemas/getAllMedia.schema";

export const getAllMediaController = async (ctx: {
  set: Context["set"];
  query: Static<typeof getAllMediaSchema.query>;
}) => {
  try {
    const mediaData = await getAllMediaService(ctx.query.page);
    return returnReadResponse(ctx.set, 200, "Media fetched successfully", mediaData);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
