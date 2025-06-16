import { Context } from "elysia";
import { mainErrorHandler } from "../../helpers/error/handler";
import { debugService } from "./debug.service";
import { returnWriteResponse } from "../../helpers/callback/httpResponse";
import { getCookie } from "../../helpers/http/userHeader/cookies/getCookies";
import { checkUserEmailAndUsernameAvailabillity } from "../user/repositories/checkUserEmailAndUsernameAvailability.repository";
import { jwtDecode } from "../../helpers/http/jwt/decode";

export const debugController = async (ctx: Context) => {
  try {
    const userCookie = getCookie(ctx);
    const jwtSession = jwtDecode(userCookie.auth_token!);
    jwtSession.user.email = ctx.params.email;
    jwtSession.user.username = ctx.params.username;
    const checkAvailabillity = await checkUserEmailAndUsernameAvailabillity(
      jwtSession.user
    );
    return checkAvailabillity;
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};

// buat debug untuk date to number (second)
