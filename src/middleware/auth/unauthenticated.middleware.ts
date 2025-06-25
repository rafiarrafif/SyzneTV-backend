import { Context } from "elysia";
import { getCookie } from "../../helpers/http/userHeader/cookies/getCookies";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";

export const unautenticatedMiddleware = (ctx: Context) => {
  // Check if the user is already logged in by checking the auth token in cookies. If the user is logged in, return an error response
  try {
    const cookie = getCookie(ctx);
    if (cookie && cookie.auth_token)
      return returnErrorResponse(ctx.set, 401, "You are already logged in. ");
  } catch (_) {
    void _; // Pass
  }
};
