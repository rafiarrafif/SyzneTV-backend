import { Prisma } from "@prisma/client";
import { generateUUIDv7 } from "../../src/helpers/databases/uuidv7";
import { prisma } from "../../src/utils/databases/prisma/connection";

export const systemPreferenceSeed = async () => {
  const preferences: Prisma.SystemPreferenceUpsertArgs["create"][] = [
    {
      id: generateUUIDv7(),
      key: "REGISTRATION_ENABLED",
      value: process.env.ENABLE_REGISTRATION === "true" ? "true" : "false",
      description: "Enable or disable user registration",
    },
    {
      id: generateUUIDv7(),
      key: "HERO_BANNER_ENABLED",
      value: process.env.ENABLE_HERO_BANNER === "true" ? "true" : "false",
      description: "Enable or disable hero banner feature",
    },
  ];

  await prisma.$transaction(async (tx) => {
    return await Promise.all(
      preferences.map(
        async (pref) =>
          await tx.systemPreference.upsert({
            where: {
              key: pref.key,
            },
            update: pref,
            create: pref,
          }),
      ),
    );
  });
};
