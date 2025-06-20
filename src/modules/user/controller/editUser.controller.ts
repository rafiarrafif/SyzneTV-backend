import { Context } from "elysia";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { Prisma } from "@prisma/client";
import { editUserService } from "../services/editUser.service";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { setCookie } from "../../../helpers/http/userHeader/cookies/setCookies";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import { jwtEncode } from "../../../helpers/http/jwt/encode";

export const editUserController = async (
  ctx: Context & {
    body: Prisma.UserUncheckedCreateInput;
  }
) => {
  try {
    const userCookie = getCookie(ctx);
    const auth_token = userCookie.auth_token;
    if (!auth_token)
      return returnErrorResponse(ctx.set, 401, "User Unauthenticated");

    const userHeaderInfo = getUserHeaderInformation(ctx);

    const newUserData = await editUserService(
      auth_token,
      userHeaderInfo,
      ctx.body
    );

    const newJwtToken = await jwtEncode(newUserData);
    setCookie(ctx.set, COOKIE_KEYS.AUTH, newJwtToken);

    return returnWriteResponse(ctx.set, 201, "User data updated", newJwtToken);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
