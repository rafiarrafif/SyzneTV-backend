export interface LoginWithPasswordRequest {
  identifier: string;
  password: string;
}

export interface JWTSessionPayload {
  id: string;
  isAuthenticated: boolean;
  userId: string;
  deviceType: string;
  deviceOs: string;
  deviceIp: string;
  isOnline: boolean;
  lastOnline: Date;
  validUntil: Date;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  iat: number;
  exp: number;
}
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  birthDate: null;
  gender: null;
  phoneCC: null;
  phoneNumber: null;
  bioProfile: null;
  profilePicture: null;
  commentPicture: null;
  preferenceId: null;
  verifiedAt: null;
  disabledAt: null;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
}
interface Role {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  pictureImage: string;
  badgeImage: null;
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
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
}
