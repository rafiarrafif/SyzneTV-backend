import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { Prisma } from "@prisma/client";
import { Context } from "elysia";
import { createUserService } from "../services/createUser.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createUserSchema } from "../schemas/createUser.schema";

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
export const createUserController = async (
  ctx: Context & { body: Prisma.UserCreateInput }
) => {
  // Validate the user input using a validation schema
  const { error } = createUserSchema.validate(ctx.body);
  if (error)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  // Create the user in the database using the service
  try {
    const newUser = await createUserService(ctx.body);
    return returnWriteResponse(
      ctx.set,
      201,
      "User created successfully",
      newUser
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
