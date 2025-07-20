export interface findUserRolePayload {
  identifier: string;
  query_target: "id" | "name";
}

export interface createUserRoleServicePayload {
  formInput: {
    name: string;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    pictureImage?: File | null;
    badgeImage?: File | null;
    isSuperadmin: boolean;
    canEditMedia: boolean;
    canManageMedia: boolean;
    canEditEpisodes: boolean;
    canManageEpisodes: boolean;
    canEditComment: boolean;
    canManageComment: boolean;
    canEditUser: boolean;
    canManageUser: boolean;
    canEditSystem: boolean;
    canManageSystem: boolean;
    createdBy: string;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };
  queryTarget: "withAdmin";
}
export interface createUserRoleRepositoryPayload {
  name: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  pictureImage?: string | null;
  badgeImage?: string | null;
  isSuperadmin: boolean;
  canEditMedia: boolean;
  canManageMedia: boolean;
  canEditEpisodes: boolean;
  canManageEpisodes: boolean;
  canEditComment: boolean;
  canManageComment: boolean;
  canEditUser: boolean;
  canManageUser: boolean;
  canEditSystem: boolean;
  canManageSystem: boolean;
  createdBy: string;
  deletedAt?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
