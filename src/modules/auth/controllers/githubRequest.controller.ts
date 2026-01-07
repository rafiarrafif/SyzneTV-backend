import { Context } from "elysia";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { githubRequestService } from "../services/http/githubRequest.service";

export const githubRequestController = async (
  ctx: Context & { query: { callback?: string } }
) => {
  const loginUrl = await githubRequestService(ctx.query.callback);
  return returnReadResponse(ctx.set, 200, "Login URL generated successfully", {
    endpointUrl: loginUrl,
  });
};
