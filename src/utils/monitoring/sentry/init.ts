import { init } from "@sentry/node";

export const sentryInit = () => {
  console.log("🔧 Initializing Sentry...");
  try {
    init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.APP_ENV,
    });
    console.log("✅ Sentry initialized.");
  } catch (error) {
    console.error("❌ Failed to initialize Sentry:", error);
    process.exit(1);
  }
};
