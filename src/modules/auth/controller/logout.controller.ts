import { Context } from "elysia";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { clearCookies } from "../../../helpers/http/userHeader/cookies/clearCookies";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { logoutService } from "../services/logout.service";

export const logoutController = async (ctx: Context) => {
  try {
    const userCookie = getCookie(ctx);
    if (!userCookie || !userCookie.auth_token) {
      return returnErrorResponse(ctx.set, 401, "You're not logged in yet");
    }

    const clearSession = logoutService(userCookie.auth_token);

    clearCookies(ctx.set, [COOKIE_KEYS.AUTH]);
    return returnWriteResponse(
      ctx.set,
      200,
      "Successfully logged out",
      clearSession
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
