import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { updateAllEpisodeThumbnailService } from "../services/http/updateAllEpisodeThumbnail.service";
import { updateAllEpisodeThumbnailSchema } from "../schemas/updateAllEpisodeThumbnail.schema";

/**
 * Updating all episode thumbnails for a specific target service reference ID.
 *
 * This controller handles the bulk update of episode thumbnails for all episodes associated with a specific service reference ID.
 * It fetches the latest thumbnail data from external sources and updates the existing episode records in the database accordingly.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const updateAllEpisodeThumbnailController = async (ctx: {
  set: Context["set"];
  body: Static<typeof updateAllEpisodeThumbnailSchema.body>;
}) => {
  try {
    const newEpisodeThumbnailsCount = await updateAllEpisodeThumbnailService(ctx.body.service_reference_id);
    return returnWriteResponse(ctx.set, 204, `Updating ${newEpisodeThumbnailsCount} episode thumbnails successfully.`);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
