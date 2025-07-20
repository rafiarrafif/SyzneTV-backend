import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { getUserOptionsSchema } from "../schemas/getUserOptions.schema";
import { getUserDataOptions } from "../user.types";
import { getUserByUsernameSchema } from "../schemas/getUserByUsername.schema";
import { getUserByUsernameService } from "../services/http/getUserByUsername.service";

export const getUserByUsernameController = async (ctx: Context) => {
  try {
    const params = getUserByUsernameSchema.parse(ctx.params);
    const options = getUserOptionsSchema.parse(ctx.query) as getUserDataOptions;
    const getUserByEmail = await getUserByUsernameService(
      params.username,
      options
    );

    return returnReadResponse(ctx.set, 200, "User data found", getUserByEmail);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
