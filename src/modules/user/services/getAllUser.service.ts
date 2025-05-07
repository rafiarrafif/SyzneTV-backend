import { userModel } from "../user.model";

export const getAllUsersService = async () => {
  try {
    const allUser = await userModel.findMany({
      where: {
        deletedAt: null,
      },
    });
    return allUser;
  } catch (error) {
    throw error;
  }
};
