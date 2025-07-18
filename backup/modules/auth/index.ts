import Elysia from "elysia";
import { loginWithPassword } from "./controller/loginWithPassword.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authVerification } from "./controller/authVerification.controller";
import { logoutController } from "./controller/logout.controller";

export const authModule = new Elysia({ prefix: "/auth" })
  .post("/legacy", loginWithPassword)
  .post("/verification", authVerification, {
    beforeHandle: authMiddleware,
  })
  .post("/logout", logoutController);
