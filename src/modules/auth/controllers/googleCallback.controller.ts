import { Context, Static } from "elysia";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { googleCallbackService } from "../services/http/googleCallback.service";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { googleCallbackSchema } from "../schemas/googleCallback.schema";

export const googleCallbackController = async (ctx: {
  set: Context["set"];
  query: Static<typeof googleCallbackSchema.query>;
  headers: Static<typeof googleCallbackSchema.headers>;
}) => {
  try {
    const userHeaderInfo = getUserHeaderInformation(ctx.headers["x-client-info"]);

    const authToken = await googleCallbackService(ctx.query, userHeaderInfo);
    return returnReadResponse(ctx.set, 200, "Authentication successful!", {
      authToken,
    });
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
