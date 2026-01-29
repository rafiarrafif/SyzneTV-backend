import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertEpisodeService } from "../services/http/bulkInsertEpisode.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

/**
 * @function bulkInsertMediaController
 * @description Perform bulk insert of episodes for a specific media. This operation fetches episode data from external sources and inserts them into the database. The page parameter is optional; if not provided, the first page of episodes will be fetched.
 *
 * @param {Context & { body: { media_mal_id: number }; query: { page?: number } }} ctx
 * The context object containing the request body.
 * The body must include:
 * - media_mal_id: number - The MyAnimeList ID of the media for which episodes will be inserted.
 * The query may include:
 * - page?: number - (Optional) The page number of episodes to fetch and insert. If not provided, defaults to the first page.
 *
 * @example
 * Request route: POST /internal/episode/bulk-insert
 * Request body:
 * {
 *   "media_mal_id": 12345
 * }
 * Query parameter:
 * ?page=2 (Optional, specifies the page number of episodes to fetch and insert)
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 201,
 *   message: "Bulk insert episode operation completed successfully",
 *   data: { ...bulkInsertResult } // Data returned only if the env run on development mode
 * }
 *
 * @throws {Object}
 * An error response object if validation fails or an error occurs during bulk insert operation.
 * Return example:
 * {
 *   success: false,
 *   status: <Status Code>,
 *   message: "<Error Message>",
 *   error: { ...errorDetails } // Additional error details if available and the env run on development mode
 * }
 */
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
      "Bulk insert episode operation completed successfully",
      bulkInsertResult,
    );
  } catch (err) {
    return mainErrorHandler(ctx.set, err);
  }
};
