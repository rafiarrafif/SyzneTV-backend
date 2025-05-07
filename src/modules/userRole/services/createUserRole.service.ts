import { Prisma } from "@prisma/client";
import { createUserRoleRepo } from "../userRole.repository";

export const createUserRoleService = async (
  userRoleData: Prisma.UserRoleUncheckedCreateInput
) => {
  try {
    const dataPayload = {
      ...userRoleData,
      isSuperadmin: Boolean(userRoleData.isSuperadmin),
      canEditMedia: Boolean(userRoleData.canEditMedia),
      canManageMedia: Boolean(userRoleData.canManageMedia),
      canEditEpisodes: Boolean(userRoleData.canEditEpisodes),
      canManageEpisodes: Boolean(userRoleData.canManageEpisodes),
      canEditComment: Boolean(userRoleData.canEditComment),
      canManageComment: Boolean(userRoleData.canManageComment),
      canEditUser: Boolean(userRoleData.canEditUser),
      canManageUser: Boolean(userRoleData.canManageUser),
      canEditSystem: Boolean(userRoleData.canEditSystem),
      canManageSystem: Boolean(userRoleData.canManageSystem),
      deletedAt: null,
    };
    const newUserRole = await createUserRoleRepo(dataPayload);
    return newUserRole;
  } catch (error) {
    throw error;
  }
};
