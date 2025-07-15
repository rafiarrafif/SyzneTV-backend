import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findUserByEmailOrUsernameRepository } from "../repositories/findUserByEmailOrUsername.repository";

export const findUserByEmailService = async (email: string) => {
  try {
    const findUserByEmail = findUserByEmailOrUsernameRepository(email, {
      queryTarget: "email",
    });
    return findUserByEmail;
  } catch (error) {
    ErrorForwarder(error);
  }
};
