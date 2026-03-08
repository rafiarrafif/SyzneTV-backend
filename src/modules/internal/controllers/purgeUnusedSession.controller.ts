import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { purgeUnusedSessionService } from "../services/http/purgeUnusedSession.service";

/**
 * Controller for purging unused user sessions
 *
 * This controller handles the HTTP request for purging all unused user sessions. It will delete all unused sessions from the database based on their authentication status and deleted status.
 * The response will indicate the success of the operation and may include details about the number of sessions purged if the environment is running in development mode.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const purgeUnusedSessionController = async (ctx: Context) => {
  try {
    const result = await purgeUnusedSessionService();
    return returnWriteResponse(ctx.set, 200, "Successfully purged all unused user sessions", result);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
