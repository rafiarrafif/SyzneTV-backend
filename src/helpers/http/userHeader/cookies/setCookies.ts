import { serialize } from "cookie";

export const setCookie = async (
  set: any,
  name: string,
  payload: string,
  options?: Partial<{
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    maxAge: number;
    path: string;
  }>
) => {
  // Define the default configurations for the cookie
  const cookieLifetime = Number(process.env.SESSION_EXPIRE!);
  const defaultOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    maxAge: cookieLifetime,
    path: "/",
  };

  // Merge the default options with the provided options
  const finalOptions = { ...defaultOptions, ...options };

  // Create the serialized cookie string
  const serializedCookie = serialize(name, payload, finalOptions);

  // Set the cookie in the response headers
  set.headers["set-cookie"] = serializedCookie;
  return serializedCookie;
};
