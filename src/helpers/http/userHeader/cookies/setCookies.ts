import { serialize } from "cookie";

export const setCookie = async (set: any, payload: string) => {
  const cookieLifetime = Number(process.env.SESSION_EXPIRE!);
  const serializedCookie = serialize("auth_token", payload, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: cookieLifetime,
    path: "/",
  });

  set.headers["set-cookie"] = serializedCookie;
  return serializedCookie;
};
