import { UserHeaderInformation } from "../../helpers/cookies/userHeader/getUserHeaderInformation/types";

export interface createUserSessionServiceParams {
  userId: string;
  userHeaderInformation: UserHeaderInformation;
}
