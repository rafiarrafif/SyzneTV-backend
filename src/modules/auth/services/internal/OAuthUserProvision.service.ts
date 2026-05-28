import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { createUserSessionService } from "../../../userSession/services/createUserSession.service";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { createUserViaOauth } from "../../../user/user.types";
import { createUserService } from "../../../user/services/internal/createUser.service";
import { AppError } from "../../../../helpers/error/instances/app";
import { findAuthIdentityByEmailAndProviderRepository } from "../../repositories/READ/findAuthIdentityByEmailAndProvider.repository";

export const OAuthUserProvisionService = async (payload: createUserViaOauth, userHeaderInfo: UserHeaderInformation) => {
  try {
    const checkExistingUser = await findAuthIdentityByEmailAndProviderRepository(payload.email);

    if (
      checkExistingUser &&
      checkExistingUser.oauth_accounts.some((account) => account.provider_sub === payload.oauthProvider.sub)
    ) {
      // User already exists with this OAuth provider
      return await createUserSessionService(checkExistingUser.id, userHeaderInfo);
    } else if (!checkExistingUser) {
      // No user with this email, create new user
      const createdUser = await createUserService(payload);
      return await createUserSessionService(createdUser.id, userHeaderInfo);
    }

    // User exists with this email but not with this OAuth provider
    throw new AppError(409, "Email already in use with another account");
  } catch (error) {
    ErrorForwarder(error);
  }
};
