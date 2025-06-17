import { Prisma } from "@prisma/client";
import { userModel } from "../user.model";
import { JWTSessionPayload } from "../../auth/auth.types";

export const updateUserRepo = async (
  username: string,
  payload: Prisma.UserUpdateInput
) => {
  try {
    const userData = await userModel.update({
      where: {
        username,
      },
      data: payload,
    });
    return userData;
  } catch (error) {
    throw error;
  }
};
