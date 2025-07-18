import Elysia from "elysia";
import { assignRoleToUserController } from "./controller/assignRoleToUser.controller";

export const userRoleAssignmentModule = new Elysia({
  prefix: "/role-assignments",
}).post("/assign", assignRoleToUserController);
