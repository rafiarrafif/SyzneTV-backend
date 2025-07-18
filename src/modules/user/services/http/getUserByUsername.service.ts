import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getUserDataOptions } from "../../user.types";
import { findUserService } from "../internal/findUser.service";

export const getUserByUsernameService = async (
  username: string,
  options: getUserDataOptions
) => {
  try {
    return await findUserService({
      identifier: username,
      queryTarget: "username",
      options,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
