import Elysia from "elysia";
import { githubRequestController } from "./controllers/githubRequest.controller";
import { githubCallbackController } from "./controllers/githubCallback.controller";
import { googleRequestController } from "./controllers/googleRequest.controller";
import { googleCallbackController } from "./controllers/googleCallback.controller";
import { getOauthProvidersController } from "./controllers/getOauthProviders.controller";
import { getCallbackProviderUrlController } from "./controllers/getCallbackProviderUrl.controller";
import { tokenValidationController } from "./controllers/tokenValidation.controller";
import { logoutController } from "./controllers/logout.controller";
import { tokenValidationSchema } from "./schemas/tokenValidation.schema";
import { getOauthProvidersSchema } from "./schemas/getOauthProviders.schema";
import { getCallbackProviderUrlSchema } from "./schemas/getCallbackProviderUrl.schema";
import { googleRequestSchema } from "./schemas/googleRequest.schema";
import { googleCallbackSchema } from "./schemas/googleCallback.schema";
import { githubRequestSchema } from "./schemas/githubRequest.schema";
import { githubCallbackSchema } from "./schemas/githubCallback.schema";
import { logoutSchema } from "./schemas/logout.schema";

export const authModule = new Elysia({ prefix: "/auth", tags: ["Authentication"] })
  .post("/token/validate", tokenValidationController, tokenValidationSchema)
  .get("/providers", getOauthProvidersController, getOauthProvidersSchema)
  .get("/providers/:name/callback", getCallbackProviderUrlController, getCallbackProviderUrlSchema)
  .get("/google", googleRequestController, googleRequestSchema)
  .get("/google/callback", googleCallbackController, googleCallbackSchema)
  .get("/github", githubRequestController, githubRequestSchema)
  .get("/github/callback", githubCallbackController, githubCallbackSchema)
  .post("/logout", logoutController, logoutSchema);
