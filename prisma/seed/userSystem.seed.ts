import { createFile } from "../../src/helpers/files/createFile";
import { hashPassword } from "../../src/helpers/security/password/hash";
import { prisma } from "../../src/utils/databases/prisma/connection";
import {Prisma} from "@prisma/client";

export const userSystemSeed = async () => {
  const payload = {
    username: process.env.DEFAULT_ADMIN_USERNAME!,
    fullname: "SYSTEM",
    email: process.env.DEFAULT_ADMIN_EMAIL!,
    password: await hashPassword(process.env.DEFAULT_ADMIN_PASSWORD!),
  } as Prisma.UserCreateInput;

  const insertedUserSystem = await prisma.user.upsert({
    where: { username: payload.username },
    update: payload,
    create: {
      ...payload,
    },
    select: { id: true },
  });
  await createFile(
    `export const SystemAccountId = "${insertedUserSystem.id}";`,
    {
      fileName: "system.ts",
      targetDir: "src/config/account",
      overwriteIfExists: true,
    },
  );

  return insertedUserSystem;
};
