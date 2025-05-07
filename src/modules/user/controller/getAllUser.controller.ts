import { handlePrismaError } from "../../../utils/databases/prisma/error/handler";
import {
  returnErrorResponse,
  returnReadResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { getAllUsersService } from "../services/getAllUser.service";

export const getAllUser = async (ctx: Context) => {
  try {
    const allUser = await getAllUsersService();
    return returnReadResponse(
      ctx.set,
      200,
      "All user ranks successfully",
      allUser
    );
  } catch (error) {
    const { status, message, details } = handlePrismaError(error);
    return returnErrorResponse(ctx.set, status, message, details);
  }
};
