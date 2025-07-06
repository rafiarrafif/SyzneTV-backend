import { Context } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export const softDeleteUserController = async (ctx: Context) => {
  const data = ctx.params.username;
  return returnWriteResponse(ctx.set, 201, "Okay", data);
};
