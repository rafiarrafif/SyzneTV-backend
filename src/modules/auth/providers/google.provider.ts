import { Google } from "arctic";
import { getOauthProviders } from "../../../config/oauthProvider";

export const googleProvider = (
  callbackURI = `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}:${
    process.env.APP_PORT
  }/${getOauthProviders().find((p) => p.name === "google")?.client_callback}`,
) => {
  return new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    callbackURI,
  );
};
