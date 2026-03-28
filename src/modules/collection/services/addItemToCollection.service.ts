import { parse } from "cookie";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { tokenValidationService } from "../../auth/services/http/tokenValidation.service";
import slugify from "slugify";

export type AddItemToCollectionPayload = {
  cookie: string;
  collectionName: string;
  mediaId: string;
};

export const addItemToCollectionService = async (payload: AddItemToCollectionPayload) => {
  const { auth_token } = parse(payload.cookie);
  return (await tokenValidationService(auth_token as string)).user.id;
};
