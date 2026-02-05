import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { updateAllEpisodeThumbnailService } from "../services/http/updateAllEpisodeThumbnail.service";

export const updateAllEpisodeThumbnailController = async (
  ctx: Context & { body: { service_reference_id: string } },
) => {
  try {
    const newEpisodeThumbnailsCount = await updateAllEpisodeThumbnailService(
      ctx.body.service_reference_id,
    );
    return returnWriteResponse(
      ctx.set,
      204,
      `Updating ${newEpisodeThumbnailsCount} episode thumbnails successfully.`,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
