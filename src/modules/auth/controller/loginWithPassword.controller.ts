import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { loginWithPasswordSchema } from "../auth.schema";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { LoginWithPasswordRequest } from "../auth.types";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { setCookie } from "../../../helpers/http/userHeader/cookies/setCookies";

export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  const userHeaderInfo = getUserHeaderInformation(ctx);

  try {
    const jwtToken = await loginWithPasswordService(ctx.body, userHeaderInfo);

    const cookie = setCookie(ctx.set, jwtToken);
    return returnWriteResponse(ctx.set, 200, "Autentication Success", cookie);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
