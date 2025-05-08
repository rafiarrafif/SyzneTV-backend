import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { loginWithPasswordSchema } from "../auth.schema";
import { returnErrorResponse } from "../../../helpers/callback/httpResponse";
import { LoginWithPasswordRequest } from "../auth.types";

export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  const result = await loginWithPasswordService(ctx.body);
  return result;
};
