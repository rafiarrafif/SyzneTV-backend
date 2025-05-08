import { Context } from "elysia";
import { createUserSessionService } from "../services/createUserSession.service";
import { getUserHeaderInformation } from "../../../helpers/cookies/userHeader/getUserHeaderInformation";
import { handlePrismaError } from "../../../utils/databases/prisma/error/handler";
import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";

export const createUserSessionRole = async (
  ctx: Context & { body: { userId: string } }
) => {
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
    const { status, message, details } = handlePrismaError(error);
    return returnErrorResponse(ctx.set, status, message, details);
  }
};
