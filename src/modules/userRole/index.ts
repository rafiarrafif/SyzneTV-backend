import Elysia from "elysia";
import { getUserRoleByNameController } from "./controllers/getUserRoleByName.controller";
import { getUserRoleByIdController } from "./controllers/getUserRoleById.controller";
import { createUserRoleWithAdminController } from "./controllers/createUserRoleWithAdmin.controller";

export const userRoleModule = new Elysia({ prefix: "/users/roles" })
  .get("/n/:name", getUserRoleByNameController)
  .get("/id/:id", getUserRoleByIdController)
  .post("/", createUserRoleWithAdminController);
