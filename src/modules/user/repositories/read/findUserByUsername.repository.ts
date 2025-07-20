import { userModel } from "../../user.model";
import {
  getUserDataIncludeOptions,
  getUserDataOptions,
} from "../../user.types";

export const findUserByUsernameRepository = async (
  username: string,
  include?: getUserDataOptions["include"]
) => {
  return await userModel.findUnique({
    where: {
      username,
    },
    include: include
      ? (Object.fromEntries(include.map((key) => [key, true])) as Record<
          getUserDataIncludeOptions,
          true
        >)
      : undefined,
  });
};
