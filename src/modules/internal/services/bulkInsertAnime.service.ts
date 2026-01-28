import { Prisma } from "@prisma/client";
import { getContentReferenceAPI } from "../../../config/apis/media.reference";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { bulkInsertGenresRepository } from "../repositories/bulkInsertGenres.repository";
import { InsertMediaRepository } from "../repositories/bulkinsertMedia.repository";
import { bulkInsertStudiosRepository } from "../repositories/bulkInsertStudios.repository";
import { MediaFullInfoResponse } from "../types/mediaFullInfo.type";
import { generateSlug } from "../../../helpers/characters/generateSlug";
import { bulkInsertCharWithVAService } from "./internal/bulkInsertCharWithVA.service";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { SystemAccountId } from "../../../config/account/system";

export const bulkInsertAnimeService = async (malId: number) => {
  try {
    const { baseURL, getMediaFullInfo } = getContentReferenceAPI(malId);
    const mediaFullInfo = (await fetch(baseURL + getMediaFullInfo).then((res) =>
      res.json(),
    )) as MediaFullInfoResponse;

    const insertedGenres = await bulkInsertGenresRepository(mediaFullInfo);
    const insertedStudios = await bulkInsertStudiosRepository(mediaFullInfo);
    const insertedCharacters = await bulkInsertCharWithVAService(malId);

    const constructMediaPayload: Prisma.MediaUpsertArgs["create"] = {
      id: generateUUIDv7(),
      title: mediaFullInfo.data.title,
      titleAlternative: (mediaFullInfo.data
        .titles as unknown) as Prisma.InputJsonValue,
      slug: await generateSlug(mediaFullInfo.data.title, {
        model: "media",
        target: "slug",
      }),
      malId: mediaFullInfo.data.mal_id,
      genres: {
        connect: insertedGenres.map((id) => ({ id })),
      },
      studios: {
        connect: insertedStudios.map((id) => ({ id })),
      },
      characters: {
        connect: insertedCharacters.map(({ id }) => ({ id })),
      },
      score: mediaFullInfo.data.score,
      pictureMedium: mediaFullInfo.data.images.webp.image_url,
      pictureLarge: mediaFullInfo.data.images.webp.large_image_url,
      status: mediaFullInfo.data.status,
      startAiring: mediaFullInfo.data.aired.from,
      endAiring: mediaFullInfo.data.aired.to,
      synopsis: mediaFullInfo.data.synopsis,
      ageRating: mediaFullInfo.data.rating,
      mediaType: mediaFullInfo.data.type,
      source: mediaFullInfo.data.source,
      onDraft: false,
      uploadedBy: SystemAccountId,
    };
    const insertedMedia = await InsertMediaRepository({
      malId: mediaFullInfo.data.mal_id,
      payload: constructMediaPayload,
    });

    return insertedMedia;
  } catch (error) {
    ErrorForwarder(error);
  }
};
