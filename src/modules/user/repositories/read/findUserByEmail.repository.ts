import { userModel } from "../../user.model";

export const findUserByEmailRepository = async (email: string) => {
  return await userModel.findUnique({
    where: {
      email,
    },
  });
};
