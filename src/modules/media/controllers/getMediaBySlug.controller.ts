import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getMediaBySlugSchema } from "../schemas/getMediaBySlug.schema";
import { getMediaBySlugService } from "../services/http/getMediaBySlug.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const getMediaBySlugController = async (ctx: {
  set: Context["set"];
  params: Static<typeof getMediaBySlugSchema.params>;
}) => {
  try {
    const mediaData = await getMediaBySlugService(ctx.params.slug);
    return returnReadResponse(ctx.set, 200, "Media fetched successfully", mediaData);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
