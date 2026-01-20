import { Context } from "elysia";
import { tokenValidationService } from "../services/http/tokenValidation.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const tokenValidationController = (
  ctx: Context & { body: { token: string } },
) => {
  try {
    const { token } = ctx.body;
    const validationResult = tokenValidationService(token);
    return returnReadResponse(
      ctx.set,
      200,
      "Validation successful",
      validationResult,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
