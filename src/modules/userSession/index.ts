import Elysia from "elysia";

export const userSessionModule = new Elysia({ prefix: "/sessions" }).get(
  "/",
  () => "User Session Module is working!"
);
