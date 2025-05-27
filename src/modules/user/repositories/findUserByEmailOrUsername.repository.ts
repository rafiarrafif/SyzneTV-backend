import { AppError } from "../../../helpers/error/instances/app";
import { userModel } from "../user.model";

export const findUserByEmailOrUsernameRepo = async (identifier: string) => {
  try {
    const userData =
      (await userModel.findUnique({
        where: { email: identifier },
        include: {
          roles: {
            omit: {
              createdBy: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      })) ||
      (await userModel.findUnique({
        where: { username: identifier },
        include: {
          roles: {
            omit: {
              createdBy: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      }));

    if (!userData) return false;
    return userData;
  } catch (error) {
    throw new AppError(500, "Database error", error);
  }
};
