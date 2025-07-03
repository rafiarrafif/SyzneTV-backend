import { Context } from "elysia";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { clearCookies } from "../../../helpers/http/userHeader/cookies/clearCookies";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { logoutService } from "../services/logout.service";

/**
 * @function logoutController
 * @description Handles user logout by clearing authentication token from cookies.
 *              Requires valid active session (auth token in cookies).
 *              In development environment, returns additional session clearing details.
 *
 * @param {Context} ctx - The context object containing request information.
 *
 * @returns {Promise<Object>} A response object indicating logout success or failure.
 * @throws {Object} An error response if no active session found or server error occurs.
 *
 * @example
 * Request route: POST /logout
 * Request headers:
 * {
 *   "Cookie": "auth_token=<JWT_TOKEN>"
 * }
 *
 * Success Response:
 * Status: 200 OK
 * {
 *   "message": "Successfully logged out",
 *   "data": { ...clearSessionDetails } // Only in development environment
 * }
 *
 * Failure Responses:
 * - 401 Unauthorized: No active session found (not logged in)
 * - 500 Internal Server Error: Server error during logout process
 */
export const logoutController = async (ctx: Context) => {
  try {
    // Get the user cookie from the request, if not found, return an error
    const userCookie = getCookie(ctx);
    if (!userCookie || !userCookie.auth_token) {
      return returnErrorResponse(ctx.set, 401, "You're not logged in yet");
    }

    // Call the logout service to clear the user session
    const clearSession = logoutService(userCookie.auth_token);

    // Clear the auth cookie from the user session
    clearCookies(ctx.set, [COOKIE_KEYS.AUTH]);
    return returnWriteResponse(
      ctx.set,
      200,
      "Successfully logged out",
      clearSession
    );

    // If there's an error during the logout process, handle it
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
