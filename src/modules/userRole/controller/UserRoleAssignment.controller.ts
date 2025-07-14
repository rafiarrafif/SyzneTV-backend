import { Context } from "elysia";
import { userRoleAssignmentSchema } from "../schemas/userRoleAssignment.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { userRoleAssignmentService } from "../services/userRoleAssignment.service";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";

export const userRoleAssignmentController = async (ctx: Context) => {
  // Validate form input using zod schema
  const validation = userRoleAssignmentSchema.safeParse(ctx.body);
  if (!validation.success)
    return returnErrorResponse(
      ctx.set,
      400,
      "Validation error",
      validation.error
    );

  try {
    // Store the userId and roleId from the validated data
    const payload = {
      userId: validation.data.userId,
      roleId: validation.data.roleId,
    };

    // Call the service to assign the user role
    const AssignUserRole = await userRoleAssignmentService(payload);
    return returnWriteResponse(
      ctx.set,
      201,
      "User role assignment successfully",
      AssignUserRole
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
