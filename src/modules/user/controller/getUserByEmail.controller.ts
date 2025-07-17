import { Context } from "elysia";
import { getUserByIdSchema } from "../schemas/getUserById.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserByEmailService } from "../services/http/getUserByEmail.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getUserOptionsSchema } from "../schemas/getUserOptions.schema";

export const getUserByEmailController = async (ctx: Context) => {
  try {
    const params = getUserByIdSchema.parse(ctx.params);
    const options = getUserOptionsSchema.parse(ctx.query);
    const getUserByEmail = await getUserByEmailService(params.email, options);

    return returnReadResponse(ctx.set, 200, "User data found", getUserByEmail);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
