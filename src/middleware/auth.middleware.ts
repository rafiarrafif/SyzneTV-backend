import { Context } from "elysia";

export const authMiddleware = (ctx: Context) => {
  const token = ctx.cookie.auth_token;

  if (!token) {
    ctx.set.status = 401;
    throw "Unauthorized: Token missing";
  }
};
