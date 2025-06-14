import Elysia from "elysia";
import { createUserRole } from "./controller/createUserRole.controller";
import { unautenticatedMiddleware } from "../../middleware/auth/unauthenticated.middleware";

export const userRoleModule = new Elysia({ prefix: "/roles" })
  .get("/", () => "Hello User Role Module", {
    beforeHandle: unautenticatedMiddleware,
  })
  .post("/", createUserRole);
