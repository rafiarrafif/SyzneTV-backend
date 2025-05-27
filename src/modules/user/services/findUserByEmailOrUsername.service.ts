import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findUserByEmailOrUsernameRepo } from "../repositories/findUserByEmailOrUsername.repository";

export const findUserByEmailOrUsernameService = async (identifier: string) => {
  try {
    const userData = await findUserByEmailOrUsernameRepo(identifier);
    return userData;
  } catch (error) {
    ErrorForwarder(error);
  }
};
