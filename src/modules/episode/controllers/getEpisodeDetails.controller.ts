import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getEpisodeDetailsService } from "../services/http/getEpisodeDetails.service";

export interface GetEpisodeDetailsParams {
  mediaSlug?: string;
  episode?: string;
}

export const getEpisodeDetailsController = async (
  ctx: Context & { params: GetEpisodeDetailsParams },
) => {
  try {
    const result = await getEpisodeDetailsService(ctx.params);
    return returnReadResponse(
      ctx.set,
      200,
      "Episode details fetched successfully.",
      result,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
