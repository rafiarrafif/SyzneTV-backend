import { Prisma } from "@prisma/client";
import { userModel } from "../user.model";

export const updateUserRepository = async (
  username: string,
  payload: Prisma.UserUpdateInput
) => {
  const userData = await userModel.update({
    where: {
      username,
    },
    data: payload,
  });

  return userData;
};
