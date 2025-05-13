import { Context } from "elysia";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { authVerificationService } from "../services/authVerification.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";

export const authVerification = async (ctx: Context) => {
  try {
    const cookie = getCookie(ctx);
    if (!cookie.auth_token)
      return returnErrorResponse(ctx.set, 401, "Auth token not found");

    const authService = authVerificationService(cookie.auth_token);
    return returnWriteResponse(ctx.set, 200, "User authenticated", authService);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
