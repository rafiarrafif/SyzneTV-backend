import { email } from "zod";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { GithubCallbackUserData } from "../../auth.types";
import { githubProvider } from "../../providers/github.provider";
import { OAuthUserProvisionService } from "../internal/OAuthUserProvision.service";

export const githubCallbackService = async (
  query: { code: string; callbackURI: string },
  userHeaderInfo: UserHeaderInformation,
) => {
  try {
    // Initialize GitHub provider
    const github = githubProvider(query.callbackURI);

    // Validate the authorization code and get tokens
    const tokens = await github.validateAuthorizationCode(query.code);
    const accessToken = tokens.accessToken();

    // Fetch user data and email from GitHub API
    const userdata = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const useremail = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Parse the user data and email responses into JSON, then combine them into a single payload
    const userPayload: GithubCallbackUserData = {
      user_data: await userdata.json(),
      user_email: await useremail.json(),
    };

    // Provision or authenticate the user in the system
    return await OAuthUserProvisionService(
      {
        fullname: userPayload.user_data.name || userPayload.user_data.login,
        username: `gh_${userPayload.user_data.id}`,
        email: userPayload.user_email.find((email) => email.primary)?.email || userPayload.user_email[0]?.email,
        avatar: userPayload.user_data.avatar_url,
        bio: userPayload.user_data.bio || undefined,
        oauthProvider: {
          providerName: "github",
          sub: userPayload.user_data.id.toString(),
          token: accessToken,
        },
      },
      userHeaderInfo,
    );
  } catch (error) {
    ErrorForwarder(error, 500, "Authentication service error");
  }
};
