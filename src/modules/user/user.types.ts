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
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface createUserViaOauth {
  provider: string;
  providerId: string;
  providerToken?: string;
  providerPayload?: unknown;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  password: string;
}
