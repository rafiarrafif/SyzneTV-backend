import { Context } from "elysia";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { Prisma } from "@prisma/client";
import { editUserService } from "../services/editUser.service";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";

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

    const editUser = await editUserService(auth_token, ctx.body);
    return editUser;
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
