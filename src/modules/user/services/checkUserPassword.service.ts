import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { comparePassword } from "../../../helpers/security/password/compare";
import { findUserByEmailOrUsernameService } from "./findUserByEmailOrUsername.service";
import { User } from "@prisma/client";

export const checkUserPasswordService = async (
  username: string,
  password: string
) => {
  try {
    const userData = (await findUserByEmailOrUsernameService(username, {
      verbose: true,
    })) as User;
    const RawPassword = userData.password;

    const matchingPassword = await comparePassword(password, RawPassword);
    if (!matchingPassword) {
      throw new AppError(401, "Invalid Credential");
    }

    return true;
  } catch (error) {
    ErrorForwarder(error);
  }
};
