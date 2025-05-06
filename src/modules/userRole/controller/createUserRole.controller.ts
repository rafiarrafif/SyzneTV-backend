import { Prisma } from "@prisma/client";
import { Context } from "elysia";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { handlePrismaError } from "../../../utils/databases/prisma/error/handler";
import { createUserRoleSchema } from "../userRole.schema";
import { JWTDecodeToken } from "../../../helpers/jwt/decodeToken";
import { prisma } from "../../../utils/databases/prisma/connection";
import { createUserRoleService } from "../services/createUserRole.service";
import { PrismaErrorTypes } from "../../../utils/databases/prisma/error/types";

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
export const createUserRole = async (
  ctx: Context & { body: Prisma.UserRoleUncheckedCreateInput }
) => {
  const { error } = createUserRoleSchema.validate(ctx.body);
  if (error)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  const formData: Prisma.UserRoleUncheckedCreateInput = { ...ctx.body };
  const userCreator = JWTDecodeToken(ctx);

  const dataPayload = {
    ...formData,
    isSuperadmin: Boolean(formData.isSuperadmin),
    canEditMedia: Boolean(formData.canEditMedia),
    canManageMedia: Boolean(formData.canManageMedia),
    canEditEpisodes: Boolean(formData.canEditEpisodes),
    canManageEpisodes: Boolean(formData.canManageEpisodes),
    canEditComment: Boolean(formData.canEditComment),
    canManageComment: Boolean(formData.canManageComment),
    canEditUser: Boolean(formData.canEditUser),
    canManageUser: Boolean(formData.canManageUser),
    canEditSystem: Boolean(formData.canEditSystem),
    canManageSystem: Boolean(formData.canManageSystem),
    createdBy: userCreator.user.id,
    deletedAt: null,
  };

  createUserRoleService(dataPayload)
    .then((result) =>
      returnWriteResponse(ctx.set, 201, "User role created", result)
    )
    .catch((error: PrismaErrorTypes) =>
      returnErrorResponse(ctx.set, error.status, error.message, error.details)
    );
};
