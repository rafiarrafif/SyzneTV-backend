import { JWTAuthToken } from "../../../helpers/http/jwt/decode/types";

export const checkUserPasswordService = async (
  jwtPayload: JWTAuthToken,
  password: string
) => {
  return `id user "${jwtPayload.userId}" cek password "${password}"`;
};
