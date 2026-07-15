import {Static} from "elysia";
import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {createVideoServiceInternalRepository} from "../../repositories/createVideoService.repository";
import {createVideoServiceInternalSchema} from "../../schemas/createVideoServiceInternal.schema";
import slugify from "slugify";

export const createVideoServiceInternalService = async (body: Static<typeof createVideoServiceInternalSchema.body>) => {
    try {
        return await createVideoServiceInternalRepository({
            name: body.name,
            slug: slugify(body.name, {lower: true}),
            resolution: body.resolution,
            domain: body.domain,
            image_url: body.logo,
            hex_color: body.hexColor,
            endpoint_video: body.endpointVideo,
            endpoint_image: body.endpointImage,
            endpoint_short: body.endpointShort,
            endpoint_download: body.endpointDownload,
        });
    } catch (error) {
        ErrorForwarder(error);
    }
};
