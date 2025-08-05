import { Context } from "elysia";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { githubRequestService } from "../services/githubRequest.service";

export const githubRequestController = async (ctx: Context) => {
  const loginUrl = await githubRequestService();
  return returnReadResponse(
    ctx.set,
    200,
    "Login URL generated successfully",
    String(loginUrl)
  );
};
