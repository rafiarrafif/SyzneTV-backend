import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { CreateHeroBannerRequestBody } from "../../controllers/createHeroBanner.controller";
import { insertHeroBannerRepository } from "../../repositories/insertHeroBanner.repository";

export const createHeroBannerService = async (
  payload: CreateHeroBannerRequestBody,
) => {
  try {
    return await insertHeroBannerRepository(payload);
  } catch (error) {
    ErrorForwarder(error);
  }
};
