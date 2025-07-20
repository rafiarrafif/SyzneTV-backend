import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserRoleByIdSchema } from "../schemas/getUserRoleById.schema";
import { findUserRoleByIdService } from "../services/http/findUserRoleById.service";

export const getUserRoleByIdController = async (ctx: Context) => {
  try {
    const params = getUserRoleByIdSchema.parse(ctx.params);
    return await findUserRoleByIdService(params.id);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
