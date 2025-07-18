import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { LoginWithPasswordRequest } from "../auth.types";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { setCookie } from "../../../helpers/http/userHeader/cookies/setCookies";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import { loginWithPasswordSchema } from "../schemas/loginWithPassword";

/**
 * @function loginWithPassword
 * @description Authenticates user using username/email and password.
 *              On successful login, sets JWT token in cookies and returns token in response (development only).
 *              In production environment, only sets cookie without returning token in response body.
 *
 * @param {Context & { body: LoginWithPasswordRequest }} ctx - The context object containing request information.
 * @param {Object} ctx.body - The login credentials.
 *
 * @returns {Promise<Object>} A response object indicating authentication success or failure.
 * @throws {Object} An error response if validation fails or authentication error occurs.
 *
 * @example
 * Request route: POST /auth/legacy
 * Request body:
 * {
 *   "identifier": "user@example.com" or "username123",
 *   "password": "securePassword123"
 * }
 *
 * Success Response:
 * Status: 200 OK
 * Development:
 * {
 *   "message": "Authentication Success",
 *   "token": "<JWT_TOKEN>" // Only in development environment
 * }
 *
 * Failure Responses:
 * - 400 Bad Request: Invalid user input or missing fields
 * - 401 Unauthorized: Invalid credentials
 * - 500 Internal Server Error: Server error during authentication
 */
export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  // Validate the request body against the schema
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  // Extract user header information
  const userHeaderInfo = getUserHeaderInformation(ctx);

  try {
    // Call the service to handle login with password
    const jwtToken = await loginWithPasswordService(ctx.body, userHeaderInfo);

    // Set the authentication cookie with the JWT token
    setCookie(ctx.set, COOKIE_KEYS.AUTH, jwtToken);
    return returnWriteResponse(
      ctx.set,
      200,
      "Authentication Success",
      jwtToken
    );
  } catch (error) {
    // Handle any errors that occur during the login process
    return mainErrorHandler(ctx.set, error);
  }
};
