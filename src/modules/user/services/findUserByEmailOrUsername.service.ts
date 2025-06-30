import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findUserByEmailOrUsernameRepo } from "../repositories/findUserByEmailOrUsername.repository";

export interface FindUserByEmailOrUsernameOptions {
  verbose?: boolean;
}

export const findUserByEmailOrUsernameService = async (
  identifier: string,
  options: FindUserByEmailOrUsernameOptions = {}
) => {
  try {
    const userData = await findUserByEmailOrUsernameRepo(identifier, options);
    if (!userData) throw new AppError(404, "User not found");

    return userData;
  } catch (error) {
    ErrorForwarder(error);
  }
};
