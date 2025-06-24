import jwt from "jsonwebtoken";

export const jwtEncode = <T extends object>(payload: T) => {
  const tokenLifetime = Number(process.env.SESSION_EXPIRE!);
  const jwtSecret = process.env.JWT_SECRET!;
  const jwtToken = jwt.sign(payload, jwtSecret, {
    expiresIn: tokenLifetime,
  });

  return jwtToken;
};
