import z from "zod";

// Define related tables that are retrieved together with user data
const includeOptions = ["preference", "assignedRoles"] as const;

export const getUserOptionsSchema = z.object({
  verbosity: z.enum(
    ["exists", "basic", "full"],
    "option: verbosity value must match with enum types",
  ),
  include: z
    .string()
    .optional()
    .transform((val) => val?.split(",") ?? [])
    .refine(
      (arr) =>
        arr.every((val) =>
          includeOptions.includes(val.trim() as typeof includeOptions[number]),
        ),
      "option: include value didn't match with enum types",
    ),
});
