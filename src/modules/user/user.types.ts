export interface getUserDataService {
  identifier: string;
  queryTarget: "id" | "providerId" | "email" | "username";
  options: getUserDataOptions;
}
export interface getUserDataOptions {
  verbosity: "exist" | "basic" | "full";
  include?: getUserDataIncludeOptions[];
}
export type getUserDataIncludeOptions = "preference" | "roles";

export interface createUserViaRegisterInput {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  datebirth?: Date;
}
export interface createUserViaOauth extends createUserViaRegisterInput {
  oauthProvider: {
    providerName: string;
    sub: string;
    token: string;
    refreshToken?: string;
    expiresAt?: Date;
  };
}
