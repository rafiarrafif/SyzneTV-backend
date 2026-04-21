import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { selectAllMediaRepository } from "../../repositories/SELECT/selectAllMedia.repository";

export const getAllMediaService = async (pagination: string) => {
  try {
    const page = /^\d+$/.test(pagination) && Number(pagination) > 0 ? Number(pagination) : 1;

    return selectAllMediaRepository(page);
  } catch (error) {
    ErrorForwarder(error);
  }
};
