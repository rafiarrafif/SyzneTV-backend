import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createVideoServiceInternalService } from "../services/http/createVideoService.service";

export interface CreateVideoServiceBodyRequest {
  name: string;
  domain: string;
  logo: string;
  hexColor: string;
  endpointVideo: string;
  endpointThumbnail: string;
  endpointDownload?: string;
}

export const createVideoServiceInternalController = async (
  ctx: Context & { body: CreateVideoServiceBodyRequest },
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
