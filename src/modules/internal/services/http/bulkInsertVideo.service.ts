import {SystemAccountId} from "../../../../config/account/system";
import {bulkInsertVideoSchema} from "../../schemas/bulkInsertVideo.schema";
import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {Static} from "elysia";
import {Prisma} from "@prisma/client";
import {bulkInsertVideoRepository} from "../../repositories/bulkInsertVideo.repository";

export const bulkInsertVideoService = async (body: Static<typeof bulkInsertVideoSchema.body>) => {
    try {
        const constructedInput: Prisma.VideoCreateManyInput[] = body.data.flatMap((d) => (
            d.videos.flatMap((v) => (
                {
                    created_by_id: SystemAccountId,
                    media_id: body.media_id,
                    episode_number: d.episode,
                    video_service_id: v.service_id,
                    video_code: v.video_code,
                    short_code: v.short_code,
                    thumbnail_code: v.thumbnail_code,
                    download_code: v.download_code
                }
            ))
        ));
        return await bulkInsertVideoRepository(constructedInput)
    } catch (error) {
        ErrorForwarder(error);
    }
};

