import { SystemAccountId } from "../../../../config/account/system";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { CreateVideoServiceInternalBodyRequest } from "../../controllers/createVideoService.controller";
import { createVideoServiceInternalRepository } from "../../repositories/createVideoService.repository";

export const createVideoServiceInternalService = async (
  body: CreateVideoServiceInternalBodyRequest,
) => {
  try {
    return await createVideoServiceInternalRepository({
      name: body.name,
      domain: body.domain,
      logo: body.logo,
      hexColor: body.hexColor,
      endpointVideo: body.endpointVideo,
      endpointThumbnail: body.endpointThumbnail,
      endpointDownload: body.endpointDownload,
      createdBy: SystemAccountId,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
