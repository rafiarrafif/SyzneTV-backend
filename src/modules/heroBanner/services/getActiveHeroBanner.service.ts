import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findAllActiveHeroBannerRepository } from "../repositories/GET/findAllActiveHeroBanner.repository";

export const getActiveHeroBannerService = async () => {
  try {
    return await findAllActiveHeroBannerRepository();
  } catch (error) {
    ErrorForwarder(error);
  }
};
