import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { bulkInsertVideoService } from "../services/http/bulkInsertVideo.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { bulkInsertVideoSchema } from "../schemas/bulkInsertVideo.schema";

/**
 * Bulk insert videos into the database.
 *
 * This controller handles the bulk insertion of videos by accepting an array of video data in the request body,
 * invoking the service to perform the insertion, and returning a response with the inserted video details.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const bulkInsertVideoController = async (ctx: {
  set: Context["set"];
  body: Static<typeof bulkInsertVideoSchema.body>;
}) => {
  try {
    const insertedVideos = await bulkInsertVideoService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Videos inserted successfully", insertedVideos);
  } catch (error) {
    throw mainErrorHandler(ctx.set, error);
  }
};
