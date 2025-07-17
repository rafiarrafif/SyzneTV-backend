import { Context } from "elysia";

export const parseArrayQuery = <T extends string = string>(
  query: Context["query"],
  key: string
): T[] => {
  const raw = query[key];
  if (!raw) return [];

  return raw.split(",").map((s) => s.trim()) as T[];
};
