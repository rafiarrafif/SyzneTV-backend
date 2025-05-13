import jwt from "jsonwebtoken";

export const jwtDecode = (payload: string) => {
  // return payload;
  if (!payload) throw "JWT decode payload not found";
  const JWTKey = process.env.JWT_SECRET!;

  try {
    const decodedPayload = jwt.verify(payload, JWTKey);
    return decodedPayload;
  } catch (error) {
    throw "JWT expired or not valid";
  }
};
