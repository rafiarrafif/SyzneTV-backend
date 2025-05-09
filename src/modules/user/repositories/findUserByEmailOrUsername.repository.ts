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

  if (!userData) throw "User not found";

  return userData;
};
