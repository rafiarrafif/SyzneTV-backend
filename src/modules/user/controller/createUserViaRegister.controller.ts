import { Context } from "elysia";
import { createUserSchema } from "../schemas/createUser.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createUserViaRegisterService } from "../services/createUserViaRegister.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const createUserViaRegisterController = async (ctx: Context) => {
  try {
    const validate = createUserSchema.parse(ctx.body);

    const createUser = await createUserViaRegisterService(validate);
    return returnWriteResponse(
      ctx.set,
      201,
      "User Successfully Created",
      createUser
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
