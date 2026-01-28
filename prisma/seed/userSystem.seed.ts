import { generateUUIDv7 } from "../../src/helpers/databases/uuidv7";
import { prisma } from "../../src/utils/databases/prisma/connection";

export const userSystemSeed = async () => {
  const payload = {
    id: generateUUIDv7(),
    name: "SYSTEM",
    username: process.env.DEFAULT_ADMIN_USERNAME || "system",
    email: process.env.DEFAULT_ADMIN_EMAIL || "system@example.com",
    password:
      process.env.DEFAULT_ADMIN_PASSWORD ||
      "$2a$12$ynOrzVCvRdejGp/7KJW4lOAwRzFYhSHDE.Dp3Fqh3sXAq1BIwfwc6",
  };

  return await prisma.user.upsert({
    where: { username: payload.username },
    update: {},
    create: payload,
    select: { id: true },
  });
};
