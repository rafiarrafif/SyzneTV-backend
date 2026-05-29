import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";
import { createUserViaOauth } from "../../../user/user.types";

export const createUserWithOAuthCredentialsRepository = async (payload: createUserViaOauth) => {
  try {
    const { oauthProvider, ...userData } = payload;
    return await prisma.user.create({
      data: {
        ...userData,
        oauth_accounts: {
          create: {
            provider_name: oauthProvider.providerName,
            provider_sub: oauthProvider.sub,
            provider_token: oauthProvider.token,
            refresh_token: oauthProvider.refreshToken,
            expires_at: oauthProvider.expiresAt,
          },
        },
        preferences: {
          create: {},
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Error creating user with OAuth credentials", error);
  }
};
