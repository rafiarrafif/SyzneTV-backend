import { Prisma } from "@prisma/client";
import { userModel } from "../user.model";

export const createUserRepo = async (data: Prisma.UserCreateInput) => {
  try {
    const userData = await userModel.create({
      data,
      omit: {
        password: true,
      },
    });

    return userData;
  } catch (error) {
    throw error;
  }
};
