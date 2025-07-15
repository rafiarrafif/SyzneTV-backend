import { userModel } from "../user.model";
import { FindUserByEmailOrUsernameOptions } from "../user.types";

export const findUserByEmailOrUsernameRepository = async (
  identifier: string,
  options: FindUserByEmailOrUsernameOptions
) => {
  const userData = await userModel.findUnique({
    where: { email: identifier },
    include: {
      assignedRoles: {
        select: {
          role: {
            omit: {
              createdBy: true,
              updatedAt: true,
              createdAt: true,
              deletedAt: true,
            },
          },
        },
      },
    },
  });

  if (!userData) return false;
  return userData;
};
