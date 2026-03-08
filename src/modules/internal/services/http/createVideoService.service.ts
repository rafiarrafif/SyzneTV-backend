import { Static } from "elysia";
import { SystemAccountId } from "../../../../config/account/system";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { createVideoServiceInternalRepository } from "../../repositories/createVideoService.repository";
import { createVideoServiceInternalSchema } from "../../schemas/createVideoServiceInternal.schema";

export const createVideoServiceInternalService = async (body: Static<typeof createVideoServiceInternalSchema.body>) => {
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
