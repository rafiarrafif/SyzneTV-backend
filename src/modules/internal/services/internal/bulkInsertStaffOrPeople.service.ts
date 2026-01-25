import { SystemAccountId } from "../../../../config/account/system";
import { getPeopleAPI } from "../../../../config/apis/people.reference";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { bulkInsertVoiceActorRepository } from "../../repositories/bulkInsertVoiceActor.repository";
import { PeopleInfoResponse } from "../../types/peopleInfo";

export const bulkInsertStaffOrPeopleService = async (malId: number) => {
  try {
    const { baseURL, getPeopleInfo } = getPeopleAPI(malId);
    const peopleData = (await fetch(baseURL + getPeopleInfo).then((res) =>
      res.json(),
    )) as PeopleInfoResponse;

    return await bulkInsertVoiceActorRepository({
      malId: peopleData.data.mal_id,
      name: peopleData.data.name,
      birthday: peopleData.data.birthday,
      description: peopleData.data.about,
      aboutUrl: peopleData.data.url,
      imageUrl: peopleData.data.images.jpg.image_url,
      websiteUrl: peopleData.data.website_url,
      creatorId: SystemAccountId,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
