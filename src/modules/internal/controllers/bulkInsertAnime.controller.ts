import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertAnimeService } from "../services/bulkInsertAnime.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { bulkInsertCharWithVAService } from "../services/internal/bulkInsertCharWithVA.service";

export const bulkInsertAnimeController = async (
  ctx: Context & { body: { mal_id: number } },
) => {
  try {
    // const bulkInsertResult = await bulkInsertAnimeService(ctx.body.mal_id);
    const bulkInsertResult = await bulkInsertCharWithVAService(ctx.body.mal_id);
    return returnWriteResponse(
      ctx.set,
      201,
      "Bulk insert anime operation completed successfully",
      bulkInsertResult,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
