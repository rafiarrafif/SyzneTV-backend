import { Context } from "elysia";
import { UserHeaderInformation } from "./types";

export interface ClientInfoHeader {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  deviceType: string;
  ip: string;
}

export const getUserHeaderInformation = (
  ctx: Context,
): UserHeaderInformation => {
  const clientInfoHeader = JSON.parse(
    (ctx.request.headers.get("x-client-info") as string) ??
      ("unknown" as string),
  ) as ClientInfoHeader;

  console.log("Client Info Header:", clientInfoHeader);

  const userHeaderInformation = {
    ip: clientInfoHeader.ip ?? "unknown",
    deviceType: clientInfoHeader.deviceType ?? "unknown",
    deviceOS:
      (clientInfoHeader.os ?? "unknown") +
      " " +
      (clientInfoHeader.osVersion ?? "unknown"),
    browser:
      (clientInfoHeader.browser ?? "unknown") +
      " " +
      (clientInfoHeader.browserVersion ?? "unknown"),
  };

  return userHeaderInformation;
};
