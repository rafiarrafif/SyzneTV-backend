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
    ip: clientInfoHeader.ip,
    deviceType: clientInfoHeader.deviceType ?? "desktop",
    osType: clientInfoHeader.os ?? "unknown",
    osVersion: clientInfoHeader.osVersion ?? "unknown",
    browserName: clientInfoHeader.browser ?? "unknown",
    browserVersion: clientInfoHeader.browserVersion ?? "unknown",
  };

  return userHeaderInformation;
};
