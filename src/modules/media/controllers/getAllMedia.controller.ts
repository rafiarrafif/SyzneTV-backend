import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getAllMediaService } from "../services/http/getAllMedia.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const getAllMediaController = async (
  ctx: Context & { query: { page: string } },
) => {
  try {
    const mediaData = await getAllMediaService(ctx.query.page);
    return returnReadResponse(
      ctx.set,
      200,
      "Media fetched successfully",
      mediaData,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
