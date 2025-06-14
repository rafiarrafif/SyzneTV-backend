import { Elysia } from "elysia";
import { routes } from "./routes";

const app = new Elysia().use(routes).listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
