import * as arctic from "arctic";
import { AppError } from "../../../helpers/error/instances/app";
import { googleProvider } from "../providers/google.provider";
import { redis } from "../../../utils/databases/redis/connection";

export const googleRequestService = async () => {
  try {
    const google = googleProvider();
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    await redis.setex(
      `${process.env.APP_NAME}:pkce:${state}`,
      300,
      codeVerifier
    );

    return url;
  } catch (error) {
    throw new AppError(
      500,
      "Google Auth provider is experiencing issues.",
      error
    );
  }
};
