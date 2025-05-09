import { findUserByEmailOrUsernameService } from "../../user/services/findUserByEmailOrUsername.service";
import { LoginWithPasswordRequest } from "../auth.types";

export const loginWithPasswordService = async (
  data: LoginWithPasswordRequest
) => {
  try {
    const userData = await findUserByEmailOrUsernameService(data.identifier);
    return userData;
  } catch (error) {
    throw error;
  }
};
