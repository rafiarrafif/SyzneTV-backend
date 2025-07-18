import z from "zod";

export const assignRoleToUserSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
