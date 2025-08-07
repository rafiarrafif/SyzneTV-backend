import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleCallbackService } from "../services/http/googleCallback.service";

export const googleCallbackController = async (
  ctx: Context & { query: { code: string; state: string } }
) => {
  try {
    const userData = await googleCallbackService(ctx.query);
    return returnWriteResponse(
      ctx.set,
      200,
      "Authenticated successfully!",
      userData
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
