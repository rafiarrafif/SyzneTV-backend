import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";

export const logoutService = async (jwtToken?: any) => {
  try {
    if (!jwtToken) throw new AppError(403, "No auth token provided");

    const jwtPayload = jwtDecode(jwtToken);
    return jwtPayload;
  } catch (error) {
    ErrorForwarder(error);
  }
};
