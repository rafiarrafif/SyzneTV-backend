import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findUserByEmailRepository } from "../../repositories/read/findUserByEmail.repository";
import { getUserDataOptions } from "../../user.types";

export const getUserByEmailService = async (
  email: string,
  options: getUserDataOptions
) => {
  try {
    return await findUserByEmailRepository(email, options);
  } catch (error) {
    ErrorForwarder(error);
  }
};
