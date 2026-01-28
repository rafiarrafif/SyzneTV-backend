import { SystemAccountId } from "../../../../config/account/system";
import { getContentReferenceAPI } from "../../../../config/apis/media.reference";
import { generateUUIDv7 } from "../../../../helpers/databases/uuidv7";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { bulkInsertCharactersRepository } from "../../repositories/bulkInsertCharacters.repository";
import { bulkInsertLangVARepository } from "../../repositories/bulkInsertLangVA.repository";
import { MediaCharWithVAInfo } from "../../types/mediaCharWithVAInfo";
import { bulkInsertStaffOrPeopleService } from "./bulkInsertStaffOrPeople.service";

export const bulkInsertCharWithVAService = async (malId: number) => {
  try {
    const { baseURL, getMediaCharactersWithVA } = getContentReferenceAPI(malId);
    const charactersWithVAData = (await fetch(
      `${baseURL}${getMediaCharactersWithVA}`,
    ).then((res) => res.json())) as MediaCharWithVAInfo;

    const insertedCharacters = [];
    for (const charEntry of charactersWithVAData.data) {
      // Insert character if not exists
      const characterInsertedId = await bulkInsertCharactersRepository({
        malId: charEntry.character.mal_id,
        name: charEntry.character.name,
        role: charEntry.role,
        favorites: charEntry.favorites,
        imageUrl: charEntry.character.images.webp.image_url,
        smallImageUrl: charEntry.character.images.webp.small_image_url,
        creatorId: SystemAccountId,
      });

      // Insert character voice actors if not exists
      const insertedVAs: { staffId: string; lang: string }[] = [];
      for (const VAEntries of charEntry.voice_actors) {
        const insertedVAId = await bulkInsertStaffOrPeopleService(
          VAEntries.person,
        );
        insertedVAs.push({
          staffId: insertedVAId.id,
          lang: VAEntries.language,
        });
      }

      // Link character with inserted VAs
      for (const langVA of insertedVAs) {
        await bulkInsertLangVARepository({
          language: langVA.lang,
          vaId: langVA.staffId,
          charId: characterInsertedId.id,
          creatorId: SystemAccountId,
        });
      }

      insertedCharacters.push(characterInsertedId);
    }

    return insertedCharacters;
  } catch (error) {
    ErrorForwarder(error);
  }
};
