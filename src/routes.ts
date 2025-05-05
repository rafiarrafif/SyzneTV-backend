import Elysia from "elysia";
import { userRoleModule } from "./modules/userRole";

export const routes = new Elysia().use(userRoleModule);
