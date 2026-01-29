import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertEpisodeService } from "../services/http/bulkInsertEpisode.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

// add pagination query
export const bulkInsertEpisodeController = async (
  ctx: Context & { body: { media_mal_id: number }; query: { page?: number } },
) => {
  try {
    const bulkInsertResult = await bulkInsertEpisodeService(
      ctx.body.media_mal_id,
      ctx.query.page,
    );
    return returnWriteResponse(
      ctx.set,
      201,
      "Success bulk insert for episode",
      bulkInsertResult,
    );
  } catch (err) {
    return mainErrorHandler(ctx.set, err);
  }
};
