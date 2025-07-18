import { assignRoleToUserRepository } from "../repositories/assignRoleToUser.repository";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { InputUserRoleAssignment } from "../userRoleAssignment.types";

export const assignRoleToUserService = async (
  payload: InputUserRoleAssignment
) => {
  try {
    const assignRoleToUser = await assignRoleToUserRepository(payload);
    return assignRoleToUser;
  } catch (error) {
    ErrorForwarder(error);
  }
};
