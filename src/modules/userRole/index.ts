import Elysia from "elysia";
import { getUserRoleByNameController } from "./controllers/getUserRoleByName.controller";
import { getUserRoleByIdController } from "./controllers/getUserRoleById.controller";

export const userRoleModule = new Elysia({ prefix: "/users/roles" })
  .get("/n/:name", getUserRoleByNameController)
  .get("/id/:id", getUserRoleByIdController);
