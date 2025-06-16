import { Prisma } from "@prisma/client";
import { userModel } from "../user.model";

export const updateUserRepo = async (
  identifier: string,
  payload: Prisma.UserUncheckedCreateInput
) => {
  try {
    const userData = await userModel.update({
      where: {
        username: identifier,
      },
      data: {
        username: payload.username,
        name: payload.name,
        birthDate: payload.name,
      },
    });
    return userData;
  } catch (error) {
    throw error;
  }
};
