import z from "zod";

export const userRoleAssignmentSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
