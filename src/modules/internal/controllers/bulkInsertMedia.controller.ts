import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertAnimeService } from "../services/http/bulkInsertAnime.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { bulkInsertMediaSchema } from "../schemas/bulkInsertMedia.schema";

/**
 * Insert anime and its related data into the database using MAL ID.
 *
 * This controller orchestrates the bulk insertion process including
 * genres, studios, producers, licensors, themes, voice actors, and relations.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const bulkInsertMediaController = async (ctx: {
  set: Context["set"];
  body: Static<typeof bulkInsertMediaSchema.body>;
}) => {
  try {
    const bulkInsertResult = await bulkInsertAnimeService(ctx.body.mal_id);
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
