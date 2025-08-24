import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getOauthProvidersService } from "../services/http/getOauthProviders.service";

export const getOauthProvidersController = (ctx: Context) => {
  try {
    return getOauthProvidersService();
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
