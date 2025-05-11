import bcrypt from "bcrypt";
import { findUserByEmailOrUsernameService } from "../../user/services/findUserByEmailOrUsername.service";
import { LoginWithPasswordRequest } from "../auth.types";
import { AppError } from "../../../helpers/error/instances/app";
import { UserHeaderInformation } from "../../../helpers/cookies/userHeader/getUserHeaderInformation/types";
import { createUserSessionService } from "../../userSession/services/createUserSession.service";
import { jwtEncode } from "../../../helpers/cookies/jwt/encode";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const loginWithPasswordService = async (
  request: LoginWithPasswordRequest,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    // search for user data using an identifier (username or email)
    const userData = await findUserByEmailOrUsernameService(request.identifier);

    // Validate the password in the request with the existing one
    if (!(await bcrypt.compare(request.password, userData.password)))
      throw new AppError(401, "Password incorrect");

    const userSession = await createUserSessionService({
      userId: userData.id,
      userHeaderInformation: userHeaderInfo,
    });

    const jwtToken = jwtEncode(userSession);

    return jwtToken;
  } catch (error) {
    throw error;
  }
};
