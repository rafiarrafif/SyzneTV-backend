import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertEpisodeService } from "../services/http/bulkInsertEpisode.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { bulkInsertEpisodeSchema } from "../schemas/bulkInsertEpisode.schema";

/**
 * Perform bulk insert of episodes for a specific media.
 * This operation fetches episode data from external sources and inserts them into the database.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const bulkInsertEpisodeController = async (ctx: {
  set: Context["set"];
  body: Static<typeof bulkInsertEpisodeSchema.body>;
  query: Static<typeof bulkInsertEpisodeSchema.query>;
}) => {
  try {
    const bulkInsertResult = await bulkInsertEpisodeService(ctx.body.media_mal_id, ctx.query.page);
    return returnWriteResponse(ctx.set, 201, "Bulk insert episode operation completed successfully", bulkInsertResult);
  } catch (err) {
    return mainErrorHandler(ctx.set, err);
  }
};
