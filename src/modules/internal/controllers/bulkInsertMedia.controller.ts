import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertAnimeService } from "../services/http/bulkInsertAnime.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

/**
 * @function bulkInsertAnimeController
 * @description Insert new anime to the database only with mal_id. This operation including inserting related data such as genres, studios, producers, licensors, themes, demographics, and relations.
 *
 * @param {Context & { body: { mal_id: number } }} ctx
 * The context object containing the request body.
 * The body must include:
 * - mal_id: number - The MyAnimeList ID of the anime to be inserted.
 *
 * @example
 * Request route: POST /internal/anime/bulk-insert
 * Request body:
 * {
 *   "mal_id": 12345
 * }
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 201,
 *   message: "Bulk insert anime operation completed successfully",
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
export const bulkInsertMediaController = async (
  ctx: Context & { body: { mal_id: number } },
) => {
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
