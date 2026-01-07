import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getOauthProvidersService } from "../services/http/getOauthProviders.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const getOauthProvidersController = (ctx: Context) => {
  try {
    const oauthProviderServices = getOauthProvidersService();
    return returnReadResponse(
      ctx.set,
      200,
      "Getting all oauth available list",
      oauthProviderServices
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
