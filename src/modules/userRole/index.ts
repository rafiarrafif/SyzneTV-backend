import Elysia from "elysia";
import { createUserRoleController } from "./controller/createUserRole.controller";
import { unautenticatedMiddleware } from "../../middleware/auth/unauthenticated.middleware";
import { userRoleAssignmentController } from "./controller/userRoleAssignment.controller";

export const userRoleModule = new Elysia({ prefix: "/roles" })
  .get("/", () => "Hello User Role Module", {
    beforeHandle: unautenticatedMiddleware,
  })
  .post("/", createUserRoleController)
  .post("/assign", userRoleAssignmentController); // need fix and it just for development only!
