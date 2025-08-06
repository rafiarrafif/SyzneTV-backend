import { Google } from "arctic";

export const googleProvider = () => {
  const redirectURI = `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}${process.env.GOOGLE_CLIENT_CALLBACK}`;
  return new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    redirectURI
  );
};
