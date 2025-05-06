import { Prisma } from "@prisma/client";
import { userRoleModel } from "../userRole.model";
import { handlePrismaError } from "../../../utils/databases/prisma/error/handler";

export const createUserRoleService = async (
  userRoleData: Prisma.UserRoleUncheckedCreateInput
) => {
  try {
    const newUserRole = await userRoleModel.create({
      data: userRoleData,
    });
    return newUserRole;
  } catch (error) {
    return handlePrismaError(error);
  }
};
