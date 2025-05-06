import { Prisma } from "@prisma/client";
import { Context } from "elysia";
import { createUserSchema } from "../user.schema";
import { createUserService } from "../services/createUser.service";
import { PrismaErrorTypes } from "../../../utils/databases/prisma/error/types";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";

/**
 * @function createUser
 * @description Creates a new user in the database.
 *
 * @param {Context & { body: Prisma.UserCreateInput }} ctx - The context object containing the request body.
 * @param {Prisma.UserCreateInput} ctx.body - The user data to be created.
 *
 * @returns {Promise<Object>} A response object indicating success or failure.
 * @throws {Object} An error response object if validation fails or an error occurs during user creation.
 *
 * @example
 * Request route: POST /users
 * Request body:
 * {
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
export const createUser = async (
  ctx: Context & { body: Prisma.UserCreateInput }
) => {
  // Validate the user input using a validation schema
  const { error } = createUserSchema.validate(ctx.body);
  if (error)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  // Create the user in the database using the service
  createUserService(ctx.body)
    .then((result) => {
      return returnWriteResponse(
        ctx.set,
        201,
        "User created successfully",
        result
      );
    })
    .catch((error: PrismaErrorTypes) => {
      return returnErrorResponse(
        ctx.set,
        error.status,
        error.message,
        error.details
      );
    });
};
