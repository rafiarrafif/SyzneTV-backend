import z from "zod";

export const getUserRoleByIdSchema = z.object({
  id: z.string(),
});
