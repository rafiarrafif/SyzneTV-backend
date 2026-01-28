import { generateUUIDv7 } from "../../src/helpers/databases/uuidv7";
import { prisma } from "../../src/utils/databases/prisma/connection";

export const userRoleSeed = async (SystemAccountId: string) => {
  console.log("🔃 Seeding user roles...");
  const roles = [
    {
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
      createdBy: SystemAccountId,
    },
    {
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
      createdBy: SystemAccountId,
    },
  ];

  await prisma.$transaction(async (tx) => {
    const createdRoles = await Promise.all(
      roles.map(
        async (role) =>
          await tx.userRole.upsert({
            where: { name: role.name },
            update: role,
            create: {
              id: generateUUIDv7(),
              ...role,
            },
          }),
      ),
    );

    await tx.userRoleAssignment.upsert({
      where: {
        userId_roleId: {
          userId: SystemAccountId,
          roleId: createdRoles.find((r) => r.name === "ADMIN")!.id,
        },
      },
      create: {
        userId: SystemAccountId,
        roleId: createdRoles.find((r) => r.name === "ADMIN")!.id,
      },
      update: {
        userId: SystemAccountId,
        roleId: createdRoles.find((r) => r.name === "ADMIN")!.id,
      },
    });
  });
};
