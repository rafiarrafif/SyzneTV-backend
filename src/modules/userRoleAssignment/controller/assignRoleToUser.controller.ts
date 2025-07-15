import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { assignRoleToUserSchema } from "../schemas/assignRoleToUser.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { assignRoleToUserService } from "../services/assignRoleToUser.service";

export const assignRoleToUserController = async (ctx: Context) => {
  const validation = assignRoleToUserSchema.safeParse(ctx.body);
  if (!validation.success)
    return returnErrorResponse(
      ctx.set,
      400,
      "Invalid Request",
      validation.error
    );

  try {
    const assignRoleToUser = await assignRoleToUserService(validation.data);
    return returnWriteResponse(
      ctx.set,
      201,
      "User Role Assigned Successfully",
      assignRoleToUser
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
