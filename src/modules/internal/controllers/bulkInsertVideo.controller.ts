import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertVideoService } from "../services/http/bulkInsertVideo.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export interface BulkInsertVideoBodyRequest {
  media_id: string;
  data: Array<{
    episode: number;
    videos: Array<{
      service_id: string;
      videoCode: string;
      thumbnailCode?: string;
    }>;
  }>;
}

/**
 * @function bulkInsertVideoController
 * @description Perform bulk insert of videos for specific episodes of a media. This operation inserts multiple videos associated with different episodes into the database based on the provided data.
 *
 * @param {Context & { body: BulkInsertVideoBodyRequest }} ctx
 * The context object containing the request body.
 * The body must include:
 * - media_id: string - The ID of the media for which episodes will be inserted.
 * - data: Array - An array of episode data, each containing:
 *   - episode: number - The episode number.
 *   - videos: Array - An array of video data for the episode, each containing:
 *    - service_id: string - The ID of the video service.
 *    - code: string - The code of the video on the service.
 *
 * @example
 * Request route: POST /internal/video/bulk-insert
 * Request body:
 *   {
 *    "media_id": "019c064e-a03d-7cc3-b2ae-5d6850ea456b",
 *    "data": [
 *        {
 *          "episode": 1,
 *          "videos": [
 *            {
 *             "service_id": "019c0df6-f8fe-7565-82cd-9c29b20232ab",
 *             "code": "fzwu9n8ge2qt"
 *            }
 *          ]
 *        },
 *        {
 *          "episode": 2,
 *          "videos": [
 *            {
 *             "service_id": "019c0df6-f8fe-7565-82cd-9c29b20232ab",
 *             "code": "w2maywh53rt8"
 *            }
 *          ]
 *        }
 *      ]
 *    },
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 201,
 *   message: "Videos inserted",
 *   data: { ...insertedVideos } // Data returned only if the env run on development mode
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
export const bulkInsertVideoController = async (
  ctx: Context & { body: BulkInsertVideoBodyRequest },
) => {
  try {
    const insertedVideos = await bulkInsertVideoService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Videos inserted", insertedVideos);
  } catch (error) {
    throw mainErrorHandler(ctx.set, error);
  }
};
