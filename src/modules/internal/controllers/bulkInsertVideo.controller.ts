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
      code: string;
    }>;
  }>;
}

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
