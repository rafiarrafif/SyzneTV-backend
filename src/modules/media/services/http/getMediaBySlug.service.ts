import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const getMediaBySlugService = (slug: string) => {
  try {
    return `Mengambil media dengan slug '${slug}'`;
  } catch (error) {
    ErrorForwarder(error);
  }
};
