import { Context } from "elysia";
import { findUserByEmailService } from "../services/findUserByEmail.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const findUserByEmailController = async (ctx: Context) => {
  try {
    const findUserByEmail = await findUserByEmailService(ctx.params.email);
    return findUserByEmail;
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
