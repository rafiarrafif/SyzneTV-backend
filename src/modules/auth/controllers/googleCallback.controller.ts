import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleCallbackService } from "../services/http/googleCallback.service";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";

export const googleCallbackController = async (
  ctx: Context & { query: { code: string; state: string } }
) => {
  try {
    const userHeaderInfo = getUserHeaderInformation(ctx);

    const userData = await googleCallbackService(ctx.query, userHeaderInfo);
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
