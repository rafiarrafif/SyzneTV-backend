export const getOauthProviders = () => {
  return [
    {
      name: "google",
      icon: "logos:google-icon",
      req_endpoint: "auth/google",
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      client_callback: "auth/google/callback",
    },
    {
      name: "github",
      icon: "streamline-logos:github-logo-2-solid",
      req_endpoint: "auth/github",
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      client_callback: "auth/github/callback",
    },
  ];
};
