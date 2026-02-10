import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { logoutService } from "../services/http/logout.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const logoutController = async (ctx: Context) => {
  try {
    const jwtToken = ctx.cookie.auth_token?.value;
    const serviceResponse = await logoutService(jwtToken);
    return returnWriteResponse(
      ctx.set,
      200,
      "Logout successful",
      serviceResponse,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
