import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findUserByEmailOrUsernameRepository } from "../repositories/findUserByEmailOrUsername.repository";
import { FindUserByEmailOrUsernameOptions } from "../user.types";

export const findUserByEmailOrUsernameService = async (
  identifier: string,
  options: FindUserByEmailOrUsernameOptions
) => {
  try {
    const userData = await findUserByEmailOrUsernameRepository(
      identifier,
      options
    );
    if (!userData) throw new AppError(404, "User not found");

    return userData;
  } catch (error) {
    ErrorForwarder(error);
  }
};
