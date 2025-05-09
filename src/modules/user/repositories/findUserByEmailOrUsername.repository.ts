import { AppError } from "../../../helpers/error/handler";
import { userModel } from "../user.model";

export const findUserByEmailOrUsernameRepo = async (identifier: string) => {
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

  if (!userData) throw new AppError(404, "User not exist");
  return userData;
};
