import jwt from "jsonwebtoken";
import { Context } from "elysia";
import { JWTAuthToken } from "./types";
import { parse } from "cookie";
import { returnErrorResponse } from "../../../callback/httpResponse";

/**
 * Verifies the authentication cookie from the request header.
 *
 * This helper function is used in an ElysiaJS context to check the validity of
 * a user's authentication token stored in cookies. If the cookie is not found,
 * it returns a `400 Bad Request`. If the token is invalid or expired, it returns
 * a `401 Unauthorized`. If the token is valid, it returns the decoded user data.
 *
 * @param ctx - The request context from Elysia, used to read headers and set the response.
 *
 * @returns The decoded JWT payload if the token is valid,
 * or a standardized error response if the cookie is missing or invalid.
 *
 * @example
 * const decodedToken = decodeAuthToken(ctx);
 *   ctx => Elysia context
 */
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
