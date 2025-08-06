import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleRequestService } from "../services/googleRequest.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const googleRequestController = async (ctx: Context) => {
  try {
    const loginUrl = await googleRequestService();
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
