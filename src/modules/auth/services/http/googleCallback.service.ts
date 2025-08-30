import { AppError } from "../../../../helpers/error/instances/app";
import { googleProvider } from "../../providers/google.provider";
import { redis } from "../../../../utils/databases/redis/connection";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { OAuthUserProvisionService } from "../internal/OAuthUserProvision.service";
import { GoogleCallbackUserData } from "../../auth.types";

export const googleCallbackService = async (
  query: {
    state: string;
    code: string;
  },
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    // get code and state for validation from params and search for state in redis cache
    const state = query.state;
    const codeVerifier = await redis.get(
      `${process.env.APP_NAME}:pkce:${state}`
    );

    // return error if the state for validation is not found in redis, and delete if found
    if (!codeVerifier) throw new AppError(408, "Request timeout");
    await redis.del(`${process.env.APP_NAME}:pkce:${state}`);

    // create access token with the result of validating the authorization code that compares access code with validator state
    const google = googleProvider();
    const tokens = await google.validateAuthorizationCode(
      query.code,
      codeVerifier
    );

    // get user data from Google using the access token that has been created.
    const accessToken = tokens.accessToken();
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = (await response.json()) as GoogleCallbackUserData;

    return await OAuthUserProvisionService(
      {
        provider: "google",
        providerId: userData.sub,
        providerToken: accessToken,
        providerPayload: userData,
        email: userData.email,
        username: `goo_${userData.sub}`,
        name: userData.name,
        avatar: userData.picture,
        password: Math.random()
          .toString(36)
          .slice(2, 16),
      },
      userHeaderInfo
    );
  } catch (error) {
    ErrorForwarder(error, 500, "Authentication service error");
  }
};
