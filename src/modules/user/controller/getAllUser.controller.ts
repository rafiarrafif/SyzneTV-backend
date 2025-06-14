import {
  returnErrorResponse,
  returnReadResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { getAllUsersService } from "../services/getAllUser.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

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
    return mainErrorHandler(ctx.set, error);
  }
};
