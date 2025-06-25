import { userModel } from "../user.model";

export const getAllUserRepo = async () => {
  const data = await userModel.findMany({
    where: {
      deletedAt: null,
    },
  });

  return data;
};
