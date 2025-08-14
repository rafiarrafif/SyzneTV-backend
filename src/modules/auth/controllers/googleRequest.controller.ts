import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleRequestService } from "../services/http/googleRequest.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const googleRequestController = async (
  ctx: Context & { query: { callback?: string } }
) => {
  try {
    const loginUrl = await googleRequestService(ctx.query.callback);
    return returnReadResponse(
      ctx.set,
      200,
      "Google login url created!",
      loginUrl
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
