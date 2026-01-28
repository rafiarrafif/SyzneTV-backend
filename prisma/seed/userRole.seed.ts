import { generateUUIDv7 } from "../../src/helpers/databases/uuidv7";
import { prisma } from "../../src/utils/databases/prisma/connection";

export const userRoleSeed = async (systemId: string) => {
  const roles = [
    {
      id: generateUUIDv7(),
      name: "ADMIN",
      description: "Administrator with full access",
      isSuperadmin: true,
      canEditMedia: true,
      canManageMedia: true,
      canEditEpisodes: true,
      canManageEpisodes: true,
      canEditComment: true,
      canManageComment: true,
      canEditUser: true,
      canManageUser: true,
      canEditSystem: true,
      canManageSystem: true,
      createdBy: systemId,
    },
    {
      id: generateUUIDv7(),
      name: "USER",
      description: "Regular user with limited access",
      isSuperadmin: false,
      canEditMedia: false,
      canManageMedia: false,
      canEditEpisodes: false,
      canManageEpisodes: false,
      canEditComment: false,
      canManageComment: false,
      canEditUser: false,
      canManageUser: false,
      canEditSystem: false,
      canManageSystem: false,
      createdBy: systemId,
    },
  ];

  await prisma.$transaction(
    roles.map((role) =>
      prisma.userRole.upsert({
        where: { name: role.name },
        update: role,
        create: role,
      }),
    ),
  );
};
