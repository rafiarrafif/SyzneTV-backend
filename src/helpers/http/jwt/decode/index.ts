import jwt from "jsonwebtoken";
import { JWTSessionPayload } from "../../../../modules/auth/auth.types";
import { AppError } from "../../../error/instances/app";

export const jwtDecode = (payload: string) => {
  // return payload;
  if (!payload) throw new AppError(401, "Unauthorized");
  const JWTKey = process.env.JWT_SECRET!;

  try {
    const decodedPayload = jwt.verify(payload, JWTKey);
    return decodedPayload as JWTSessionPayload;
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
