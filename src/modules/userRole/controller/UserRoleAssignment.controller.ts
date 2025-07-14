import { Context } from "elysia";
import { UserRoleAssignmentSchema } from "../schemas/UserRoleAssignment.schema";
import { returnErrorResponse } from "../../../helpers/callback/httpResponse";

export const UserRoleAssignmentController = async (ctx: Context) => {
  const validation = UserRoleAssignmentSchema.safeParse(ctx.body);
  //   if (!validation.success)
  //     return returnErrorResponse(
  //       ctx.set,
  //       400,
  //       "Validation error",
  //       validation.error
  //     );

  return ctx.body;
};
