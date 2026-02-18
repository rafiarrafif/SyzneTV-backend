import { Context } from "elysia";
import { tokenValidationService } from "../services/http/tokenValidation.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { parse } from "cookie";

export const tokenValidationController = async (ctx: Context) => {
  try {
    const { auth_token } = parse(ctx.request.headers.get("cookie") || "");
    const validationResult = await tokenValidationService(auth_token as string);
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
