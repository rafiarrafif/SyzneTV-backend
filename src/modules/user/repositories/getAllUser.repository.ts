import { userModel } from "../user.model";

export const getAllUserRepo = async () => {
  try {
    const data = await userModel.findMany({
      where: {
        deletedAt: null,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
