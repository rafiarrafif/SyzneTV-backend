import { userRoleModel } from "../userRole.model";
import { createUserRoleRepositoryPayload } from "../userRole.types";

export const createUserRoleRepository = async (
  payload: createUserRoleRepositoryPayload
) => {
  return await userRoleModel.create({
    data: payload,
  });
};
