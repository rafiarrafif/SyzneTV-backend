import { Context } from "elysia";
import { getCookie } from "../helpers/http/userHeader/cookies/getCookies";
import { mainErrorHandler } from "../helpers/error/handler";
import { returnErrorResponse } from "../helpers/callback/httpResponse";

export const authMiddleware = (ctx: Context) => {
  try {
    const cookie = getCookie(ctx);
    if (!cookie.auth_token)
      return returnErrorResponse(ctx.set, 401, "User Unauthorized");
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
