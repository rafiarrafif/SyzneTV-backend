import z from "zod";

const includeOptions = ["preference", "roles"] as const;

export const getUserOptionsSchema = z.object({
  verbosity: z
    .enum(
      ["exists", "basic", "full"],
      "option: verbosity value didn't match with enum types"
    )
    .optional(),
  include: z
    .string()
    .optional()
    .transform((val) => val?.split(",") ?? [])
    .refine(
      (arr) => arr.every((val) => includeOptions.includes(val.trim() as any)),
      "option: include value didn't match with enum types"
    ),
});
