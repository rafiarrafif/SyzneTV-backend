import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getAllEpisodeFromSpecificMediaService } from "../services/http/getAllEpisodeFromSpecificMedia.service";

/**
 * @function getAllEpisodeFromSpecificMediaController
 * @description Controller to handle fetching all episodes associated with a specific media slug.
 *
 * @param {Context & { params: { mediaSlug: string } }} ctx
 * The context object containing the request body.
 * The params must include:
 * - mediaSlug: string - The slug of the media to which the episode belongs.
 *
 * @example
 * Request route: GET /episodes/:mediaSlug
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 200,
 *   message: "Episodes fetched successfully.",
 *   data: { ...episodeDetails } // Data returned only if the env run on development mode
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
