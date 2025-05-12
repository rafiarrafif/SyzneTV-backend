import { Context } from "elysia";
import { UAParser } from "ua-parser-js";
import { UserHeaderInformation } from "./types";

export const getUserHeaderInformation = (
  ctx: Context
): UserHeaderInformation => {
  const headers = ctx.request.headers;
  const userAgentHeader = headers.get("user-agent") || "desktop";
  const userAgent = new UAParser(userAgentHeader);

  const userIP =
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0] ||
    "Unknown IP";

  const userHeaderInformation = {
    ip: userIP,
    deviceType: userAgent.getDevice().type || "desktop",
    deviceOS: userAgent.getOS().name + " " + userAgent.getOS().version,
    browser: userAgent.getBrowser().name + " " + userAgent.getBrowser().version,
  };

  return userHeaderInformation;
};
