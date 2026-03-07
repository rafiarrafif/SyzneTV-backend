/* eslint-disable @typescript-eslint/no-require-imports */

import openapi from "@elysiajs/openapi";
import { middleware } from "./middleware";
import { validateEnv } from "./utils/startups/validateEnv";

validateEnv();

async function bootstrap() {
  const { Elysia } = await import("elysia");

  const { routes } = require("./routes");
  const { sentryInit } = require("./utils/monitoring/sentry/init");

  sentryInit();

  console.log("\x1b[1m\x1b[33m🚀 Starting backend services...\x1b[0m");
  new Elysia()
    .use(middleware)
    .use(routes)
    .use(
      openapi({
        documentation: {
          tags: [
            {
              name: "Internal",
              description:
                "Endpoints for internal use only, not exposed to public API consumers.",
            },
          ],
        },
      }),
    )
    .listen(process.env.APP_PORT || 3000);

  console.log(
    `\x1b[1m\x1b[32m✅ Backend service started on: ${process.env.APP_URL}\x1b[0m`,
  );
}

bootstrap();
