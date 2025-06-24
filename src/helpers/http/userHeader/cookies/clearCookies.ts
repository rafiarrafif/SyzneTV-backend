import { serialize } from "cookie";
import { Context } from "elysia";

export const clearCookies = (
  set: Context["set"],
  cookieKeys: string[],
  options?: Partial<{
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    path: string;
  }>
) => {
  // Define the default configurations for clearing cookies
  const defaultOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    path: "/",
    ...options,
  };

  // Create an array of cleared cookies with the specified names
  const clearedCookies = cookieKeys.map((name) => {
    return serialize(name, "", {
      ...defaultOptions,
      expires: new Date(0),
    });
  });

  // Set the cleared cookies in the response headers
  set.headers["set-cookie"] = clearedCookies;
  return clearedCookies;
};
