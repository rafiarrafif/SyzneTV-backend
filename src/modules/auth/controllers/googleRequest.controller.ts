import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleRequestService } from "../services/http/googleRequest.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { googleRequestSchema } from "../schemas/googleRequest.schema";

export const googleRequestController = async (ctx: {
  set: Context["set"];
  query: Static<typeof googleRequestSchema.query>;
}) => {
  try {
    const loginUrl = await googleRequestService(ctx.query.callback);
    return returnReadResponse(ctx.set, 200, "Google login URL created successfully.", {
      endpointUrl: loginUrl,
    });
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
