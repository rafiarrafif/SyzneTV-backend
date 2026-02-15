import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { logoutService } from "../services/http/logout.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { parse } from "cookie";

export const logoutController = async (ctx: Context) => {
  try {
    const jwtToken = parse(ctx.request.headers.get("auth_token") || "")
      .auth_token as string;
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
