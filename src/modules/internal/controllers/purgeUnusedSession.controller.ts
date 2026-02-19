import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { purgeUnusedSessionService } from "../services/http/purgeUnusedSession.service";

export const purgeUnusedSessionController = async (ctx: Context) => {
  try {
    const result = await purgeUnusedSessionService();
    return returnWriteResponse(
      ctx.set,
      200,
      "Successfully purged all unused user sessions",
      result,
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
