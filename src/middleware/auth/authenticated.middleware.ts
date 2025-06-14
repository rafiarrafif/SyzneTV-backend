import { Context } from "elysia";
import { getCookie } from "../../helpers/http/userHeader/cookies/getCookies";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../helpers/error/handler";

export const authMiddleware = (ctx: Context) => {
  try {
    const cookie = getCookie(ctx);
    if (!cookie.auth_token)
      return returnErrorResponse(ctx.set, 401, "User Unauthorized");

    // pass
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
