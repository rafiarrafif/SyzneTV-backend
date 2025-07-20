import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createUserRoleWithAdminSchema } from "../schemas/createUserRoleWithAdmin.schema";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createUserRoleWIthAdminService } from "../services/http/createUserRoleWIthAdmin.service";

export const createUserRoleWithAdminController = async (ctx: Context) => {
  try {
    const body = createUserRoleWithAdminSchema.parse(ctx.body);
    const createUserRole = createUserRoleWIthAdminService({
      ...body,
      createdBy: "787",
    });
    return returnWriteResponse(ctx.set, 201, "User role created successfully");
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
