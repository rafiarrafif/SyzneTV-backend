import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const findAuthIdentityByEmailAndProviderRepository = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        oauth_accounts: {
          select: {
            provider_sub: true,
            provider_name: true,
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Error finding user by email", error);
  }
};
