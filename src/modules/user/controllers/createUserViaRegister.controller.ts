import { Context } from "elysia";
import { createUserViaRegisterSchema } from "../schemas/createUserViaRegister.schema";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createUserViaRegisterService } from "../services/http/createUserViaRegister.service";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";

export const createUserViaRegisterController = async (ctx: Context) => {
  try {
    const validate = createUserViaRegisterSchema.parse(ctx.body);

    const userHeaderInfo = getUserHeaderInformation(ctx);
    const createUser = await createUserViaRegisterService(
      validate,
      userHeaderInfo
    );
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
