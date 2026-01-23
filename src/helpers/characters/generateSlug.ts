import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../utils/databases/prisma/connection";

interface UniqueConfig {
  model?: keyof PrismaClient;
  target?: string;
}

export async function generateSlug(
  input: string,
  config?: UniqueConfig,
): Promise<string> {
  const baseSlug = slugify(input, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  // CASE 1: Tidak ada config → langsung return slug
  if (!config) return uniqueSlug;

  const { model, target } = config;

  // CASE 2: Validasi pasangan model-target
  if (!model || !target) {
    throw new Error(`Both "model" and "target" must be provided together.`);
  }

  // CASE 3: Cek unique
  const prismaModel = (prisma as any)[model];
  if (!prismaModel) {
    throw new Error(`Model "${model as string}" not found in PrismaClient.`);
  }

  let counter = 1;

  while (true) {
    const exists = await prismaModel.findFirst({
      where: {
        [target]: uniqueSlug,
      },
      select: { [target]: true },
    });

    if (!exists) break;

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
