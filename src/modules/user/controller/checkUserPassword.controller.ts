import { Context } from "elysia";
import { checkUserPasswordService } from "../services/checkUserPassword.service";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";

export const checkUserPasswordController = async (
  ctx: Context & { body: { password: string } }
) => {
  const cookie = getCookie(ctx);
  const jwtPayload = jwtDecode(cookie.auth_token!);
  return checkUserPasswordService(jwtPayload, ctx.body.password);
};
