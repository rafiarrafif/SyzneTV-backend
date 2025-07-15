import { Context } from "elysia";

export const findUserByEmailController = async (ctx: Context) => {
  return `Your email ${ctx.params.email}`;
};
