import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserByEmailService } from "../services/http/getUserByEmail.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getUserOptionsSchema } from "../schemas/getUserOptions.schema";
import { getUserDataOptions } from "../user.types";
import { getUserByEmailSchema } from "../schemas/getUserByEmail.schema";

export const getUserByEmailController = async (ctx: Context) => {
  try {
    const params = getUserByEmailSchema.parse(ctx.params);
    const options = getUserOptionsSchema.parse(ctx.query) as getUserDataOptions;
    const getUserByEmail = await getUserByEmailService(params.email, options);

    return returnReadResponse(ctx.set, 200, "User data found", getUserByEmail);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
