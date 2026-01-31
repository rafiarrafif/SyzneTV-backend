import { Context } from "elysia";

export const isAdminMiddleware = (ctx: Context) => {
  const isAdmin = ctx.headers["isAdmin"];
  if (!isAdmin) {
    ctx.set.status = 403;
    return {
      error: "Forbidden",
      message: "You don't have access to this resource",
    };
  }
};
