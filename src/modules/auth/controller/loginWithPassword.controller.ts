import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { loginWithPasswordSchema } from "../auth.schema";
import { returnErrorResponse } from "../../../helpers/callback/httpResponse";
import { LoginWithPasswordRequest } from "../auth.types";
import { AppError } from "../../../helpers/error/handler";

export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  try {
    const result = await loginWithPasswordService(ctx.body);
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      return returnErrorResponse(
        ctx.set,
        error.statusCode,
        error.message,
        error.details
      );
    }
  }
};
