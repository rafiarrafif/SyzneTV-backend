import { Context, Static } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { githubCallbackService } from "../services/http/githubCallback.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { githubCallbackSchema } from "../schemas/githubCallback.schema";

export const githubCallbackController = async (ctx: {
  set: Context["set"];
  query: Static<typeof githubCallbackSchema.query>;
  headers: Static<typeof githubCallbackSchema.headers>;
}) => {
  try {
    const userHeaderInfo = getUserHeaderInformation(ctx.headers["x-client-info"]);

    const authToken = await githubCallbackService(ctx.query, userHeaderInfo);
    return returnWriteResponse(ctx.set, 200, "Authenticated successfully!", {
      authToken,
    });
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
