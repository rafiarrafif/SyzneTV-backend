import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getCallbackProviderUrlService } from "../services/http/getCallbackProviderUrl.service";
import { returnReadResponse } from "../../../helpers/callback/httpResponse";

export const getCallbackProviderUrlController = async (
  ctx: Context & { params: { name: string } }
) => {
  try {
    const callbackProviderUrl = await getCallbackProviderUrlService(
      ctx.params.name
    );
    return returnReadResponse(
      ctx.set,
      200,
      "The callback URL on the provider has been found.",
      {
        callback_url: callbackProviderUrl,
      }
    );
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
