import { UserHeaderInformation } from "../../helpers/http/userHeader/getUserHeaderInformation/types";

export interface createUserSessionServiceParams {
  userId: string;
  userHeaderInformation: UserHeaderInformation;
}
