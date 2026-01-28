import { SystemAccountId } from "../../../../config/account/system";
import { generateUUIDv7 } from "../../../../helpers/databases/uuidv7";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { bulkInsertVoiceActorRepository } from "../../repositories/bulkInsertVoiceActor.repository";
import { Person } from "../../types/mediaCharWithVAInfo";

export const bulkInsertStaffOrPeopleService = async (peopleData: Person) => {
  try {
    return await bulkInsertVoiceActorRepository({
      id: generateUUIDv7(),
      malId: peopleData.mal_id,
      name: peopleData.name,
      imageUrl: peopleData.images.jpg.image_url,
      creatorId: SystemAccountId,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
