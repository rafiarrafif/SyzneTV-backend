import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { githubCallbackService } from "../services/http/githubCallback.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";

export const githubCallbackController = async (
  ctx: Context & { query: { code: string; callbackURI: string } }
) => {
  try {
    const userHeaderInfo = getUserHeaderInformation(ctx);

    const userData = await githubCallbackService(ctx.query, userHeaderInfo);
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
