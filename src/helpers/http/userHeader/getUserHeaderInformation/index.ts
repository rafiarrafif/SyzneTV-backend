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

export const getUserHeaderInformation = (clientInfo: string): UserHeaderInformation => {
  const clientInfoHeader = (JSON.parse(clientInfo) as ClientInfoHeader) ?? ("unknown" as string);

  const userHeaderInformation = {
    ip: clientInfoHeader.ip ?? "unknown",
    deviceType: clientInfoHeader.deviceType ?? "unknown",
    deviceOS: (clientInfoHeader.os ?? "unknown") + " " + (clientInfoHeader.osVersion ?? "unknown"),
    browser: (clientInfoHeader.browser ?? "unknown") + " " + (clientInfoHeader.browserVersion ?? "unknown"),
  };

  return userHeaderInformation;
};
