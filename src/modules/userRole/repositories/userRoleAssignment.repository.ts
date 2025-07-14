import { userModel } from "../../user/user.model";
import { UserRoleAssignment } from "../userRole.types";

export const userRoleAssignmentRepository = async ({
  userId,
  roleId,
}: UserRoleAssignment) => {
  const userAssigned = await userModel.update({
    where: {
      id: userId,
    },
    data: {
      roles: {
        connect: {
          id: roleId,
        },
      },
    },
  });

  return userAssigned;
};
