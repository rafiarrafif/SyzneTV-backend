import { FindUserByEmailOrUsernameOptions } from "../services/findUserByEmailOrUsername.service";
import { userModel } from "../user.model";

export const findUserByEmailOrUsernameRepo = async (
  identifier: string,
  options: FindUserByEmailOrUsernameOptions
) => {
  const userData =
    (await userModel.findUnique({
      where: { email: identifier },
      include: {
        roles: {
          omit: {
            createdBy: !options.verbose,
            createdAt: !options.verbose,
            updatedAt: !options.verbose,
            deletedAt: !options.verbose,
          },
        },
      },
    })) ||
    (await userModel.findUnique({
      where: { username: identifier },
      include: {
        roles: {
          omit: {
            createdBy: !options.verbose,
            createdAt: !options.verbose,
            updatedAt: !options.verbose,
            deletedAt: !options.verbose,
          },
        },
      },
    }));

  if (!userData) return false;
  return userData;
};
