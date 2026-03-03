import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findAllActiveHeroBannerRepository } from "../repositories/GET/findAllActiveHeroBanner.repository";

export const getActiveHeroBannerService = async () => {
  try {
    const isHeroBannerEnabled = process.env.ENABLE_HERO_BANNER === "true";
    if (!isHeroBannerEnabled)
      throw new AppError(403, "Hero Banner is disabled");

    return await findAllActiveHeroBannerRepository();
  } catch (error) {
    ErrorForwarder(error);
  }
};
