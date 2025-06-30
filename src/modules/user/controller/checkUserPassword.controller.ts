import { Context } from "elysia";
import { checkUserPasswordService } from "../services/checkUserPassword.service";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const checkUserPasswordController = async (
  ctx: Context & { body: { password: string } }
) => {
  try {
    const cookie = getCookie(ctx);
    const jwtPayload = jwtDecode(cookie.auth_token!);
    const checkUserPassword = await checkUserPasswordService(
      jwtPayload.user.username,
      ctx.body.password
    );
    return returnWriteResponse(
      ctx.set,
      204,
      "Password is valid",
      checkUserPassword
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
