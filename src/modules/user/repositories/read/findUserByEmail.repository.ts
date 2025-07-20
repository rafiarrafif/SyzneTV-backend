import { userModel } from "../../user.model";
import {
  getUserDataIncludeOptions,
  getUserDataOptions,
} from "../../user.types";

export const findUserByEmailRepository = async (
  email: string,
  include?: getUserDataOptions["include"]
) => {
  return await userModel.findUnique({
    where: {
      email,
    },
    include: include
      ? (Object.fromEntries(include.map((key) => [key, true])) as Record<
          getUserDataIncludeOptions,
          true
        >)
      : undefined,
  });
};
