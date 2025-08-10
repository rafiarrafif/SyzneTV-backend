export interface LoginIfExistAndCreateIfNot {
  email: string;
  username?: string;
  name: string;
  provider: "Google" | "GitHub";
}
