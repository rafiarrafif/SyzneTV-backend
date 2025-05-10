import bcrypt from "bcrypt";
import { findUserByEmailOrUsernameService } from "../../user/services/findUserByEmailOrUsername.service";
import { LoginWithPasswordRequest } from "../auth.types";
import { AppError } from "../../../helpers/error/instances/app";

export const loginWithPasswordService = async (
  request: LoginWithPasswordRequest
) => {
  try {
    // search for user data using an identifier (username or email)
    const userData = await findUserByEmailOrUsernameService(request.identifier);

    // Validate the password in the request with the existing one
    if (!(await bcrypt.compare(request.password, userData.password)))
      throw new AppError(401, "Password incorrect");

    return userData;
  } catch (error) {
    throw error;
  }
};
