import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { githubCallbackService } from "../services/githubCallback.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const githubCallbackController = async (
  ctx: Context & { query: { code: string } }
) => {
  try {
    const userData = await githubCallbackService(ctx.query.code);
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
