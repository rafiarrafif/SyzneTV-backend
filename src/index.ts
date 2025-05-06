import { Elysia } from "elysia";
import { routes } from "./routes";

const app = new Elysia().use(routes).listen(3200);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
