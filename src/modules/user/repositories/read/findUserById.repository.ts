import { userModel } from "../../user.model";
import {
  getUserDataIncludeOptions,
  getUserDataOptions,
} from "../../user.types";

export const findUserByIdRepository = async (
  id: string,
  include?: getUserDataOptions["include"]
) => {
  return await userModel.findUnique({
    where: {
      id,
    },
    include: include
      ? (Object.fromEntries(include.map((key) => [key, true])) as Record<
          getUserDataIncludeOptions,
          true
        >)
      : undefined,
  });
};
