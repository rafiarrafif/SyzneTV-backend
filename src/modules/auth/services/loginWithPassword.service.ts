import bcrypt from "bcrypt";
import { findUserByEmailOrUsernameService } from "../../user/services/findUserByEmailOrUsername.service";
import { LoginWithPasswordRequest } from "../auth.types";
import { AppError } from "../../../helpers/error/instances/app";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { createUserSessionService } from "../../userSession/services/createUserSession.service";
import { jwtEncode } from "../../../helpers/http/jwt/encode";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";

export const loginWithPasswordService = async (
  request: LoginWithPasswordRequest,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    // search for user data using an identifier (username or email)
    const userData = await findUserByEmailOrUsernameService(request.identifier);

    // if user data is not found, throw an error
    if (!userData) throw new AppError(404, "User not found");

    // validate the password in the request with the existing one
    if (!(await bcrypt.compare(request.password, userData.password)))
      throw new AppError(401, "Password incorrect");

    // create new user session
    const userSession = await createUserSessionService({
      userId: userData.id,
      userHeaderInformation: userHeaderInfo,
    });

    // create JWT token that contain user session
    const jwtToken = jwtEncode(userSession);
    return jwtToken;
  } catch (error) {
    ErrorForwarder(error);
  }
};
