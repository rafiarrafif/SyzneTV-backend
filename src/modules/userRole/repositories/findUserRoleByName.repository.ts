import { userRoleModel } from "../userRole.model";

export const findUserRoleByNameRepository = async (name: string) => {
  return await userRoleModel.findUnique({
    where: {
      name,
    },
  });
};
