import {
  returnErrorResponse,
  returnWriteResponse,
} from "../../../helpers/callback/httpResponse";
import { Context } from "elysia";
import { loginWithPasswordService } from "../services/loginWithPassword.service";
import { LoginWithPasswordRequest } from "../auth.types";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getUserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation";
import { setCookie } from "../../../helpers/http/userHeader/cookies/setCookies";
import { COOKIE_KEYS } from "../../../constants/cookie.keys";
import { loginWithPasswordSchema } from "../schemas/loginWithPassword";

export const loginWithPassword = async (
  ctx: Context & { body: LoginWithPasswordRequest }
) => {
  // Validate the request body against the schema
  const { error } = loginWithPasswordSchema.validate(ctx.body);
  if (error || !ctx.body)
    return returnErrorResponse(ctx.set, 400, "Invalid user input", error);

  // Extract user header information
  const userHeaderInfo = getUserHeaderInformation(ctx);

  try {
    // Call the service to handle login with password
    const jwtToken = await loginWithPasswordService(ctx.body, userHeaderInfo);

    // Set the authentication cookie with the JWT token
    setCookie(ctx.set, COOKIE_KEYS.AUTH, jwtToken);
    return returnWriteResponse(
      ctx.set,
      200,
      "Authentication Success",
      jwtToken
    );
  } catch (error) {
    // Handle any errors that occur during the login process
    return mainErrorHandler(ctx.set, error);
  }
};
