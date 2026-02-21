import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const updateAllEpisodeThumbnailService = async (
  serviceReferenceId?: string,
) => {
  try {
    if (!serviceReferenceId)
      throw new AppError(400, "Service Reference ID is required.");

    return serviceReferenceId;
  } catch (error) {
    ErrorForwarder(error);
  }
};
