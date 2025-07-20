import { Context } from "elysia";
import { getUserByIdSchema } from "../schemas/getUserById.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getUserOptionsSchema } from "../schemas/getUserOptions.schema";
import { getUserDataOptions } from "../user.types";
import { getUserByIdService } from "../services/http/getUserById.service";

export const getUserByIdController = async (ctx: Context) => {
  try {
    const params = getUserByIdSchema.parse(ctx.params);
    const options = getUserOptionsSchema.parse(ctx.query) as getUserDataOptions;
    const getUserByEmail = await getUserByIdService(params.id, options);

    return returnReadResponse(ctx.set, 200, "User data found", getUserByEmail);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
