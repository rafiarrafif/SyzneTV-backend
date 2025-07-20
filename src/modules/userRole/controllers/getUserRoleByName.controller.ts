import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserRoleByNameSchema } from "../schemas/getUserRoleByName.schema";
import { findUserRoleByNameService } from "../services/http/findUserRoleByName.service";

export const getUserRoleByNameController = async (ctx: Context) => {
  try {
    const params = getUserRoleByNameSchema.parse(ctx.params);
    return await findUserRoleByNameService(params.name);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
