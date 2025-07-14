import { Prisma } from "@prisma/client";
import { Context } from "elysia";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { createUserRoleService } from "../services/createUserRole.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createUserRoleSchema } from "../schemas/createUserRole.schema";
import { getCookie } from "../../../helpers/http/userHeader/cookies/getCookies";
import { jwtDecode } from "../../../helpers/http/jwt/decode";

/**
 * @function createUserRole
 * @description Creates a new user role in the database.
 *
 * @param {Context & { body: UserRole }} ctx - The context object containing the request body.
 * @param {UserRole} ctx.body - The user role data to be created.
 *
 * @returns {Promise<Object>} A response object indicating success or failure.
 * @throws {Object} An error response object if validation fails or an error occurs during role creation.
 *
 * @example
 * Request route: POST /roles
 * Request body:
 * {
 *   "userID": "e31668e6-c261-4a7e-9469-ffad734cf2dd",
 *   "name": "Admin",
 *   "primaryColor": "#D9D9D9",
 *   "secondaryColor": "#FFFFFF",
 *   "pictureImage": "https://example.com/picture.jpg",
 *   "badgeImage": "https://example.com/badge.jpg",
 *   "isSuperadmin": false,
 *   "canEditMedia": false,
 *   "canManageMedia": false,
 *   "canEditEpisodes": false,
 *   "canManageEpisodes": false,
 *   "canEditComment": false,
 *   "canManageComment": false,
 *   "canEditUser": false,
 *   "canManageUser": false,
 *   "canEditSystem": false,
 *   "canManageSystem": false
 * }
 */
export const createUserRoleController = async (
  ctx: Context & { body: Prisma.UserRoleUncheckedCreateInput }
) => {
  // Validation input form with schema
  const { error } = createUserRoleSchema.validate(ctx.body);
  if (error)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  // Delete this, use middleware instead!!!
  const cookie = getCookie(ctx);
  if (!cookie.auth_token)
    return returnErrorResponse(
      ctx.set,
      403,
      "Forbidden, You don't have access to this resouce"
    );

  const jwtSession = jwtDecode(cookie.auth_token);

  const formData: Prisma.UserRoleUncheckedCreateInput = {
    ...ctx.body,
    createdBy: jwtSession.userId,
  };

  try {
    const newUserRole = await createUserRoleService(formData);
    return returnWriteResponse(
      ctx.set,
      201,
      "User role created successfully",
      newUserRole
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
