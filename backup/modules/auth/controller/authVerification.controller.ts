import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { authVerificationService } from "../services/authVerification.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { clearCookies } from "../../../helpers/http/userHeader/cookies/clearCookies";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";

export const authVerification = async (ctx: Context) => {
  try {
    // Get the auth token from cookies
    const cookie = getCookie(ctx);
    if (!cookie.auth_token)
      return returnErrorResponse(ctx.set, 401, "Auth token not found");

    // Verify the auth token and get the user session
    const authService = await authVerificationService(cookie.auth_token);
    return returnWriteResponse(ctx.set, 200, "User authenticated", authService);
  } catch (error) {
    // If token is invalid or expired, clear the auth cookie and return an error response
    clearCookies(ctx.set, [COOKIE_KEYS.AUTH]);
    return mainErrorHandler(ctx.set, error);
  }
};
