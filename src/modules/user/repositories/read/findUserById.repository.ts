import { userModel } from "../../user.model";

export const findUserByIdRepository = async (id: string) => {
  return await userModel.findUnique({
    where: {
      id,
    },
  });
};
