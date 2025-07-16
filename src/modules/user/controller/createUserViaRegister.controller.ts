import { Context } from "elysia";
import { createUserViaRegisterSchema } from "../schemas/createUserViaRegister.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createUserViaRegisterService } from "../services/createUserViaRegister.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const createUserViaRegisterController = async (ctx: Context) => {
  try {
    const validate = createUserViaRegisterSchema.parse(ctx.body);

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
