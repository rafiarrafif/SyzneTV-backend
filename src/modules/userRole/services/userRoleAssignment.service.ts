import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { userRoleAssignmentRepository } from "../repositories/userRoleAssignment.repository";
import { UserRoleAssignment } from "../userRole.types";

export const userRoleAssignmentService = async ({
  userId,
  roleId,
}: UserRoleAssignment) => {
  try {
    const assignRoleToUser = await userRoleAssignmentRepository({
      userId,
      roleId,
    });
    return assignRoleToUser;
  } catch (error) {
    ErrorForwarder(error);
  }
};
