import { parse } from "cookie";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { tokenValidationService } from "../../auth/services/http/tokenValidation.service";
import { deleteItemInUserCollectionBySystemRepository } from "../repositories/deleteItemInUserCollectionBySystem.repository";

export type RemoveItemFromCollectionPayload = {
  cookie: string;
  collectionName: string;
  mediaId: string;
};

export const removeItemFromCollectionBySystemService = async (payload: RemoveItemFromCollectionPayload) => {
  try {
    const { auth_token } = parse(payload.cookie);
    const { user } = await tokenValidationService(auth_token as string);
    return await deleteItemInUserCollectionBySystemRepository({
      userId: user.id,
      collectionName: payload.collectionName,
      itemId: payload.mediaId,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
