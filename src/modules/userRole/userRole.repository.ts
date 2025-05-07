import { Prisma } from "@prisma/client";
import { userRoleModel } from "./userRole.model";

export const createUserRoleRepo = async (
  data: Prisma.UserRoleUncheckedCreateInput
) => {
  try {
    const newUserRole = await userRoleModel.create({
      data,
    });
    return newUserRole;
  } catch (error) {
    throw error;
  }
};
