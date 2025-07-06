import Elysia from "elysia";
import { getAllUserController } from "./controller/getAllUser.controller";
import { createUserController } from "./controller/createUser.controller";
import { editUserController } from "./controller/editUser.controller";
import { unautenticatedMiddleware } from "../../middleware/auth/unauthenticated.middleware";
import { authenticatedMiddleware } from "../../middleware/auth/authenticated.middleware";
import { checkUserPasswordController } from "./controller/checkUserPassword.controller";
import { isOwnerOrAdminMiddleware } from "../../middleware/userRoles/isOwnerOrAdmin.middleware";
import { softDeleteUserController } from "./controller/softDeleteUser.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", getAllUserController)
  .group("", (app) =>
    app
      .onBeforeHandle(unautenticatedMiddleware) // middleware to ensure the user is not authenticated
      .post("/", createUserController)
  )
  .group("", (app) =>
    app
      .onBeforeHandle(authenticatedMiddleware) // middleware to ensure the user is authenticated
      .put("/", editUserController)
      .post("/check-password", checkUserPasswordController)
  )
  .group("", (app) =>
    app
      .onBeforeHandle(isOwnerOrAdminMiddleware)
      .delete(":username", softDeleteUserController)
  );
