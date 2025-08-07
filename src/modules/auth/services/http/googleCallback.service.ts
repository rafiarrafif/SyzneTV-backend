import { AppError } from "../../../../helpers/error/instances/app";
import { googleProvider } from "../../providers/google.provider";
import { redis } from "../../../../utils/databases/redis/connection";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const googleCallbackService = async (query: {
  state: string;
  code: string;
}) => {
  try {
    const state = query.state;
    const codeVerifier = await redis.get(
      `${process.env.APP_NAME}:pkce:${state}`
    );
    if (!codeVerifier) throw new AppError(408, "Request timeout");
    await redis.del(`${process.env.APP_NAME}:pkce:${state}`);

    const google = googleProvider();
    const tokens = await google.validateAuthorizationCode(
      query.code,
      codeVerifier
    );
    const accessToken = tokens.accessToken();
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    ErrorForwarder(error, 500, "Authentication service error");
  }
};
