export interface FindUserByEmailOrUsernameOptions {
  queryTarget: "email" | "username" | "both";
  verbosity?: FindUserByEmailOrUsernameVerbosity; // If true, returns the user with all details including sensitive information
}
enum FindUserByEmailOrUsernameVerbosity {
  "exists",
  "basic",
  "extended",
  "full",
}
