import { userModel } from "../../user.model";

export const findUserByUsernameRepository = async (username: string) => {
  return await userModel.findUnique({
    where: {
      username,
    },
  });
};
