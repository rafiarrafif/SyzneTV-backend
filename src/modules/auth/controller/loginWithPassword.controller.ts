import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { loginWithPasswordSchema } from "../auth.schema";
import {
  returnErrorResponse,
  returnReadResponse,
} from "../../../helpers/callback/httpResponse";
import { LoginWithPasswordRequest } from "../auth.types";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";

export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  const userHeaderInfo = getUserHeaderInformation(ctx);

  try {
    const processAuth = await loginWithPasswordService(
      ctx.body,
      userHeaderInfo
    );

    return returnReadResponse(
      ctx.set,
      200,
      "Autentication Success",
      processAuth
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
