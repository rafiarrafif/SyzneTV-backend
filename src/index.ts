import { validateEnv } from "./utils/startups/validateEnv";
validateEnv();

const { Elysia } = await import("elysia");
const { routes } = await import("./routes");

const app = new Elysia().use(routes).listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
