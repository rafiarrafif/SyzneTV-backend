import z from "zod";

const includeEnum = z.enum(
  ["preference", "roles"],
  "option: include value didn't match with enum types"
);

export const getUserOptionsSchema = z.object({
  verbosity: z
    .enum(
      ["exists", "basic", "full"],
      "option: verbosity value didn't match with enum types"
    )
    .optional(),
  include: z.preprocess((val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return [val];
    return [];
  }, z.array(includeEnum).optional()),
});
