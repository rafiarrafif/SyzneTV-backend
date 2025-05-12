import jwt from "jsonwebtoken";
import { Context } from "elysia";
import { JWTAuthToken } from "./types";
import { parse } from "cookie";
import { returnErrorResponse } from "../../../callback/httpResponse";

export const JWTDecodeToken = (ctx: Context): JWTAuthToken => {
  const cookiePayload = ctx.request.headers.get("Cookie");
  if (!cookiePayload)
    throw returnErrorResponse(ctx.set, 400, "Bad Request", "No cookies found");

  const cookies = parse(cookiePayload);
  const cookiesToken = cookies.auth_token!;

  try {
    const decodedToken = jwt.verify(
      cookiesToken,
      process.env.JWT_SECRET!
    ) as JWTAuthToken;
    return decodedToken;
  } catch (error) {
    throw returnErrorResponse(
      ctx.set,
      401,
      "Unauthorized",
      "Invalid or expired token"
    );
  }
};
