import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getAllMediaRepository } from "../../repositories/GET/getAllMedia.repository";

export const getAllMediaService = async (pagination: string) => {
  try {
    const page =
      /^\d+$/.test(pagination) && Number(pagination) > 0
        ? Number(pagination)
        : 1;

    return getAllMediaRepository(page);
  } catch (error) {
    ErrorForwarder(error);
  }
};
