import z from "zod";

export const UserRoleAssignmentSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});
