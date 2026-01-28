import { generateUUIDv7 } from "../../src/helpers/databases/uuidv7";
import { createFile } from "../../src/helpers/files/createFile";
import { hashPassword } from "../../src/helpers/security/password/hash";
import { prisma } from "../../src/utils/databases/prisma/connection";

export const userSystemSeed = async () => {
  const payload = {
    name: "SYSTEM",
    username: process.env.DEFAULT_ADMIN_USERNAME!,
    email: process.env.DEFAULT_ADMIN_EMAIL!,
    password: await hashPassword(process.env.DEFAULT_ADMIN_PASSWORD!),
  };

  const insertedUserSystem = await prisma.user.upsert({
    where: { username: payload.username },
    update: payload,
    create: {
      id: generateUUIDv7(),
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
