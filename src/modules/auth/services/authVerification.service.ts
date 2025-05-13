import { AppError } from "../../../helpers/error/instances/app";
import { jwtDecode } from "../../../helpers/http/jwt/decode";

export const authVerificationService = (cookie: string) => {
  try {
    const userToken = jwtDecode(cookie);
    return userToken;
  } catch (error) {
    throw new AppError(401, "Token is invalid");
  }
};
