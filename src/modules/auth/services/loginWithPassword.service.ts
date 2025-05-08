import { LoginWithPasswordRequest } from "../auth.types";

export const loginWithPasswordService = async (
  data: LoginWithPasswordRequest
) => {
  return `Login with password service called with data: ${JSON.stringify(
    data
  )}`;
};
