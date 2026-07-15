import {AppError} from "../../../helpers/error/instances/app";
import {prisma} from "../../../utils/databases/prisma/connection";
import {SystemAccountId} from "../../../config/account/system";


export interface BulkInsertEpisodesPayload {
    media_id: string
    episode_number: number
    title: string
    title_romanji: string
    title_origin: string
    aired_at: Date
    filler: boolean
    recap: boolean
    forum_url: string
    created_by_id: string
}

export const bulkInsertEpisodesRepository = async (
    payload: BulkInsertEpisodesPayload[]
) => {
    try {
        await prisma.$transaction(async (tx) => {
            await Promise.all(
                payload.map(async (episode) =>
                    await tx.episode.upsert({
                        where: {
                            media_id_episode_number: {
                                media_id: episode.media_id,
                                episode_number: episode.episode_number
                            }
                        },
                        update: episode,
                        create: {
                            ...episode,
                            created_by_id: SystemAccountId
                        }
                    })
                )
            )
        })
    } catch (err) {
        throw new AppError(500, "Failed to bulk insert episodes", err);
    }
};
