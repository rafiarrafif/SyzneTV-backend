import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getEpisodeDetailsService } from "../services/http/getEpisodeDetails.service";

export interface GetEpisodeDetailsParams {
  mediaSlug?: string;
  episode?: string;
}

/**
 * @function getEpisodeDetailsController
 * @description Controller to handle fetching episode details based on provided parameters.
 *
 * @param {Context & { params: GetEpisodeDetailsParams }} ctx
 * The context object containing the request body.
 * The params must include:
 * - mediaSlug?: string - The slug of the media to which the episode belongs.
 * - episode?: string - The identifier of the episode.
 *
 * @example
 * Request route: GET /episodes/:mediaSlug/:episode
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 200,
 *   message: "Episode details fetched successfully.",
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
