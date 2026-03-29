import { parse } from "cookie";
import { tokenValidationService } from "../../auth/services/http/tokenValidation.service";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { upsertUserCollectionBySystemRepository } from "../repositories/upsertUserCollectionBySystem.repository";

export type AddItemToCollectionPayload = {
  cookie: string;
  collectionName: string;
  mediaId: string;
};

export const addItemToCollectionService = async (payload: AddItemToCollectionPayload) => {
  try {
    const { auth_token } = parse(payload.cookie);
    const userData = await tokenValidationService(auth_token as string);
    const saveMediaToCollection = await upsertUserCollectionBySystemRepository({
      userId: userData.user.id,
      collectionName: payload.collectionName,
      mediaConnectId: payload.mediaId,
    });

    return saveMediaToCollection;
  } catch (error) {
    ErrorForwarder(error);
  }
};
