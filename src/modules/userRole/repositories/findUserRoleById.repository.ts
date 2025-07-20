import { userRoleModel } from "../userRole.model";

export const findUserRoleByIdRepository = async (id: string) => {
  return await userRoleModel.findUnique({
    where: {
      id,
    },
  });
};
