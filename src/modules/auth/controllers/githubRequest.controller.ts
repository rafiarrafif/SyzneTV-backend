import { Context } from "elysia";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { githubRequestService } from "../services/http/githubRequest.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const githubRequestController = async (
  ctx: Context & { query: { callback?: string } },
) => {
  try {
    const loginUrl = await githubRequestService(ctx.query.callback);
    return returnReadResponse(
      ctx.set,
      200,
      "Login URL generated successfully",
      {
        endpointUrl: loginUrl,
      },
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
