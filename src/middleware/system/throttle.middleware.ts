import Elysia from "elysia";

export const throttleMiddleware = (delayMs = 2000) => (app: Elysia) =>
  app.onRequest(async () => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  });
