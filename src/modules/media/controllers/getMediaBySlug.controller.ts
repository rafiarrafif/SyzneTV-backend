import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getMediaBySlugSchema } from "../schemas/getMediaBySlug.schema";

export const getMediaBySlugController = async (ctx: {
  set: Context["set"];
  params: Static<typeof getMediaBySlugSchema.params>;
}) => {
  try {
    return {
      success: true,
      status: 200,
      message: `Media with slug '${ctx.params.slug}' fetched successfully`,
    };
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
