import { Context } from "elysia";
import { getCookie } from "../../helpers/http/userHeader/cookies/getCookies";
import { jwtDecode } from "../../helpers/http/jwt/decode";
import { returnErrorResponse } from "../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../helpers/error/handler";

export const isOwnerOrAdminMiddleware = (ctx: Context) => {
  try {
    const clientCookie = getCookie(ctx);
    const clientToken = jwtDecode(clientCookie.auth_token!);
    const clientUsername = clientToken.user.username;
    //   const isClientAdmin = clientToken.user.username

    const targetUsername = ctx.params.username;
    if (targetUsername !== clientUsername)
      return returnErrorResponse(
        ctx.set,
        401,
        "You don't have access to this resource"
      );

    // Pass
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
