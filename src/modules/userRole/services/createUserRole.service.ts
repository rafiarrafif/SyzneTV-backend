import { Prisma } from "@prisma/client";
import { userRoleModel } from "../userRole.model";
import { handlePrismaError } from "../../../utils/databases/prisma/error/handler";
import { returnErrorResponse } from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";

export const createUserRoleService = async (
  ctx: Context,
  userRoleData: Prisma.UserRoleUncheckedCreateInput
) => {
  try {
    const newUserRole = await userRoleModel.create({
      data: userRoleData,
    });
    return newUserRole;
  } catch (error) {
    const { status, message, details } = handlePrismaError(error);
    throw returnErrorResponse(ctx.set, status, message, details);
  }
};
