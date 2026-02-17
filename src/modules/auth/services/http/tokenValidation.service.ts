import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";

export const tokenValidationService = (payload: string) => {
  try {
    if (!payload || payload.trim() === "")
      throw new AppError(401, "Unauthorized: No token provided");
    const decoded = jwtDecode(payload);
    return decoded;
  } catch (error) {
    ErrorForwarder(error);
  }
};
