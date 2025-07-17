import { userModel } from "../../user.model";
import { getUserDataOptions } from "../../user.types";

export const findUserByEmailRepository = async (
  email: string,
  options: getUserDataOptions
) => {
  return await userModel.findUnique({
    where: {
      email,
    },
    omit: {},
  });
};
