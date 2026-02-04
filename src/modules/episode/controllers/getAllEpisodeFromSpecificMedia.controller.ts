import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getAllEpisodeFromSpecificMediaService } from "../services/http/getAllEpisodeFromSpecificMedia.service";

export const getAllEpisodeFromSpecificMediaController = async (
  ctx: Context & { params: { mediaSlug: string } },
) => {
  try {
    const episodesData = await getAllEpisodeFromSpecificMediaService(
      ctx.params.mediaSlug,
    );
    return returnReadResponse(
      ctx.set,
      200,
      "Episodes fetched successfully",
      episodesData,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
