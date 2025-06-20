import { Context } from "elysia";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { Prisma } from "@prisma/client";
import { editUserService } from "../services/editUser.service";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { setCookie } from "../../../helpers/http/userHeader/cookies/setCookies";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import { jwtEncode } from "../../../helpers/http/jwt/encode";

/**
 * @function editUserController
 * @description Updates user profile information. Requires valid JWT authentication token in cookies.
 *              On success, returns updated user data and sets a new JWT token in cookies.
 *              In development environment, the new JWT token is also returned in the response.
 *
 * @param {Context & { body: Prisma.UserUncheckedCreateInput }} ctx - The context object containing request information.
 * @param {Object} ctx.body - The updated user data.
 *
 * @returns {Promise<Object>} A response object indicating success or failure.
 * @throws {Object} An error response if authentication fails or validation errors occur.
 *
 * @example
 * Request route: PUT /users
 * Request headers:
 * {
 *   "Cookie": "auth_token=<JWT_TOKEN>"
 * }
 * Request body:
 * {
 *   "username": "new_username",
 *   "name": "Updated Name",
 *   "birthDate": "1990-01-01T00:00:00.000Z",
 *   "gender": "male",
 *   "phoneCC": 62,
 *   "phoneNumber": 81234567890,
 *   "bioProfile": "Updated bio",
 *   "profilePicture": "https://example.com/new-profile.jpg",
 *   "commentPicture": "https://example.com/new-comment.jpg",
 *   "deletedAt": null
 * }
 *
 * Success Response:
 * Status: 201 Created
 * {
 *   "message": "User data updated",
 *   "token": "<NEW_JWT_TOKEN>" // Only in development environment
 * }
 *
 * Failure Responses:
 * - 401 Unauthorized: Missing or invalid authentication token
 * - 400 Bad Request: Invalid user data
 * - 500 Internal Server Error: Database operation failed
 */
export const editUserController = async (
  ctx: Context & {
    body: Prisma.UserUncheckedCreateInput;
  }
) => {
  try {
    // Get the user JWT token from cookies, if the token is not found, return an error response
    const userCookie = getCookie(ctx);
    const auth_token = userCookie.auth_token;
    if (!auth_token)
      return returnErrorResponse(ctx.set, 401, "User Unauthenticated");

    // Get user browser header information from the context
    const userHeaderInfo = getUserHeaderInformation(ctx);

    // Excecute the edit user data service
    const newUserData = await editUserService(
      auth_token,
      userHeaderInfo,
      ctx.body
    );

    // create a new JWT token with the updated user data, and set it in the cookies
    const newJwtToken = await jwtEncode(newUserData);
    setCookie(ctx.set, COOKIE_KEYS.AUTH, newJwtToken);

    return returnWriteResponse(ctx.set, 201, "User data updated", newJwtToken);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
