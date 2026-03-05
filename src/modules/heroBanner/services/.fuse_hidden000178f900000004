import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { findSystemPreferenceService } from "../../systemPreference/services/internal/findSystemPreference.service";
import { findAllActiveHeroBannerRepository } from "../repositories/GET/findAllActiveHeroBanner.repository";

export const getActiveHeroBannerService = async () => {
  try {
    const isHeroBannerEnabled = await findSystemPreferenceService(
      "HERO_BANNER_ENABLED",
      "boolean",
    );
    if (!isHeroBannerEnabled)
      throw new AppError(403, "Hero Banner is disabled");

    return await findAllActiveHeroBannerRepository();
  } catch (error) {
    ErrorForwarder(error);
  }
};
