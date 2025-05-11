import { Context } from "elysia";
import { createUserSessionService } from "../services/createUserSession.service";
import { getUserHeaderInformation } from "../../../helpers/cookies/userHeader/getUserHeaderInformation";
import { mainErrorHandler } from "../../../helpers/error/handler";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";

export const createUserSessionRole = async (
  ctx: Context & { body: { userId?: string } }
) => {
  // Validate request body
  if (!ctx.body?.userId) {
    return returnErrorResponse(ctx.set, 400, "User ID is required");
  }

  // Get user device and browser information
  const userHeaderData = getUserHeaderInformation(ctx);

  try {
    const newUserSession = await createUserSessionService({
      userId: ctx.body.userId,
      userHeaderInformation: userHeaderData,
    });
    return returnWriteResponse(
      ctx.set,
      201,
      "User session created",
      newUserSession
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
