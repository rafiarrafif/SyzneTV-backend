import { Context } from "elysia";
import { getCookie } from "../../helpers/http/userHeader/cookies/getCookies";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";

export const unautenticatedMiddleware = (ctx: Context) => {
  try {
    const cookies = getCookie(ctx);
    if (cookies.auth_token)
      return returnErrorResponse(ctx.set, 403, "User already aunthenticated");

    // pass
  } catch (error) {
    // pass
  }
};
