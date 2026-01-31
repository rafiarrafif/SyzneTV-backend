import { AppError } from "../../../../helpers/error/instances/app";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";

export const tokenValidationService = (payload: string) => {
  try {
    const decoded = jwtDecode(payload);
    return decoded;
  } catch (error) {
    throw new AppError(500, "Token validation failed", error);
  }
};
