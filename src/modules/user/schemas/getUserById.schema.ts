import z from "zod";

export const getUserByIdSchema = z.object({
  email: z.email(),
});
