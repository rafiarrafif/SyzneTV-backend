import { Context, Static } from "elysia";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";
import { githubRequestService } from "../services/http/githubRequest.service";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { githubRequestSchema } from "../schemas/githubRequest.schema";

export const githubRequestController = async (ctx: {
  set: Context["set"];
  query: Static<typeof githubRequestSchema.query>;
}) => {
  try {
    const loginUrl = await githubRequestService(ctx.query.callback);
    return returnReadResponse(ctx.set, 200, "GitHub login URL created successfully.", {
      endpointUrl: loginUrl,
    });
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
