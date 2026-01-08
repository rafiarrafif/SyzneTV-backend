import { getOauthProviders } from "../../../../config/oauthProvider";
import { AppError } from "../../../../helpers/error/instances/app";

export const getCallbackProviderUrlService = async (providerName: string) => {
  const callbackUrl = getOauthProviders().find(
    (provider) => provider.name === providerName
  )?.client_callback;

  if (!callbackUrl) {
    throw new AppError(404, "The specified provider does not exist.");
  }

  return callbackUrl;
};
