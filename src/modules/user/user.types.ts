export interface getUserDataService {
  identifier: string;
  queryTarget: "id" | "email" | "username";
  options: getUserDataOptions;
}
export interface getUserDataOptions {
  verbosity: "exists" | "basic" | "full";
  include?: getUserDataIncludeOptions[];
}
export type getUserDataIncludeOptions = "preference" | "roles";

export interface createUserViaRegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
}
