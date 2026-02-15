import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";

export const tokenValidationService = (payload: string) => {
  try {
    if (!payload) return null;
    const decoded = jwtDecode(payload);
    return decoded;
  } catch (error) {
    ErrorForwarder(error);
  }
};
