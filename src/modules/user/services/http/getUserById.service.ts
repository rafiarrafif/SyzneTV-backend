import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getUserDataOptions } from "../../user.types";
import { findUserService } from "../internal/findUser.service";

export const getUserByIdService = async (
  id: string,
  options: getUserDataOptions
) => {
  try {
    return await findUserService({
      identifier: id,
      queryTarget: "id",
      options,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
