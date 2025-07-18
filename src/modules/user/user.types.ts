export interface getUserDataService {
  identifier: string;
  queryTarget: "id" | "email" | "username" | "email_username";
  options: getUserDataOptions;
}
export interface getUserDataOptions {
  verbosity: "exists" | "basic" | "full";
  include?: ("preference" | "roles")[];
}

export interface createUserViaRegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
}
