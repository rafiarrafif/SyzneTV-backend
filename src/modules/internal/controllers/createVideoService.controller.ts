import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createVideoServiceInternalService } from "../services/http/createVideoService.service";

export interface CreateVideoServiceInternalBodyRequest {
  name: string;
  domain: string;
  logo: string;
  hexColor: string;
  endpointVideo: string;
  endpointThumbnail: string;
  endpointDownload?: string;
}

/**
 * @function createVideoServiceInternalController
 * @description Perform creation of a new video service. This operation adds a new video service to the database based on the provided data.
 *
 * @param {Context & { body: CreateVideoServiceInternalBodyRequest }} ctx
 * The context object containing the request body.
 * The body must include:
 * - name: string - The name of the video service.
 * - domain: string - The domain of the video service.
 * - logo: string - The logo URL of the video service.
 * - hexColor: string - The hex color associated with the video service.
 * - endpointVideo: string - The endpoint URL for video streaming.
 * - endpointThumbnail: string - The endpoint URL for thumbnails.
 * - endpointDownload?: string - (Optional) The endpoint URL for downloads.
 *
 * @example
 * Request route: POST /internal/video-service
 * Request body:
 *   {
 *    "name": "Example Video Service",
 *    "domain": "example.com",
 *    "logo": "https://example.com/logo.png",
 *    "hexColor": "#FF5733",
 *    "endpointVideo": "https://api.example.com/videos",
 *    "endpointThumbnail": "https://api.example.com/thumbnails",
 *    "endpointDownload": "https://api.example.com/downloads"
 *   },
 *
 * @returns {Promise<Object>}
 * A response object indicating success or failure.
 * Return example:
 * {
 *   success: true,
 *   status: 201,
 *   message: "Video service created",
 *   data: { ...createdVideoService } // Data returned only if the env run on development mode
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
export const createVideoServiceInternalController = async (
  ctx: Context & { body: CreateVideoServiceInternalBodyRequest },
) => {
  try {
    const createdVideoService = await createVideoServiceInternalService(
      ctx.body,
    );
    return returnWriteResponse(
      ctx.set,
      201,
      "Video service created",
      createdVideoService,
    );
  } catch (error) {
    throw mainErrorHandler(ctx.set, error);
  }
};
