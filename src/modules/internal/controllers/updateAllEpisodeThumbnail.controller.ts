import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { updateAllEpisodeThumbnailService } from "../services/http/updateAllEpisodeThumbnail.service";

/**
 * @function updateAllEpisodeThumbnailController
 * @description Controller to handle the bulk updating of episode thumbnails for all episodes associated with a specific service reference ID.
 *
 * @param {Context & { body: { service_reference_id: string } }} ctx
 * The context object containing the request body.
 * The body must include:
 * - service_reference_id: string - The ID of the service to which the episodes belong.
 *
 * @example
 * Request route: PUT /internal/episode/update-thumbnails
 * Request body:
 * {
 *   "service_reference_id": "019c0df6-f8fe-7565-82cd-9c29b20232ab"
 * },
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 204,
 *   message: "Updating {newEpisodeThumbnailsCount} episode thumbnails successfully.",
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
export const updateAllEpisodeThumbnailController = async (
  ctx: Context & { body: { service_reference_id?: string } },
) => {
  try {
    const newEpisodeThumbnailsCount = await updateAllEpisodeThumbnailService(
      ctx.body.service_reference_id,
    );
    return returnWriteResponse(
      ctx.set,
      204,
      `Updating episode thumbnails successfully.`,
      newEpisodeThumbnailsCount,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
