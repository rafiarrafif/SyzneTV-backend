import { Context } from "elysia";
import { loginViaPasswordService } from "../services/loginViaPassword.service";

export const loginViaPassword = async (ctx: Context) => {
  const result = loginViaPasswordService(ctx);
  return result;
};
