import { appAccessTokenMiddleware } from "./middleware/global/appAccessToken.middleware";
import { validateEnv } from "./utils/startups/validateEnv";
validateEnv();

const { Elysia } = await import("elysia");
const { routes } = await import("./routes");

const app = new Elysia()
  .use(appAccessTokenMiddleware())
  .use(routes)
  .listen(process.env.APP_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
