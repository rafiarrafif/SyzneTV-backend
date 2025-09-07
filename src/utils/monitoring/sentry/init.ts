import { init } from "@sentry/node";

export const sentryInit = () =>
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.APP_ENV,
  });
