import { userRoleAssignmentModel } from "../userRoleAssignment.model";
import { InputUserRoleAssignment } from "../userRoleAssignment.types";

export const assignRoleToUserRepository = async ({
  userId,
  roleId,
}: InputUserRoleAssignment) => {
  const assignRoleToUser = await userRoleAssignmentModel.create({
    data: {
      userId,
      roleId,
    },
  });

  return assignRoleToUser;
};
