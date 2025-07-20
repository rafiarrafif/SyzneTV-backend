import z from "zod";

export const getUserRoleByNameSchema = z.object({
  name: z.string(),
});
