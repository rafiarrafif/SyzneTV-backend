import { userModel } from "../../user.model";
import {
  getUserDataIncludeOptions,
  getUserDataOptions,
} from "../../user.types";

export const findUserByProviderIdRepository = async (
  providerId: string,
  include?: getUserDataOptions["include"]
) => {
  return await userModel.findUnique({
    where: {
      providerId,
    },
    include: include
      ? (Object.fromEntries(include.map((key) => [key, true])) as Record<
          getUserDataIncludeOptions,
          true
        >)
      : undefined,
  });
};
