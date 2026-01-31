import Elysia from "elysia";

export const mediaModule = new Elysia({ prefix: "/media" }).get(
  "/",
  () => "Media Module",
);
