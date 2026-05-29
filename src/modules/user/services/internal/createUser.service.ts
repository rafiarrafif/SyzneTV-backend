import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { hashPassword } from "../../../../helpers/security/password/hash";
import { createUserViaRegisterRepository } from "../../repositories/create/createUserViaRegister.repository";
import { createUserViaOauth, createUserViaRegisterInput } from "../../user.types";

export const createUserService = async (payload: createUserViaRegisterInput) => {
  try {
    if ("password" in payload && payload.password)
      return await createUserViaRegisterRepository({
        ...payload,
        password: await hashPassword(payload.password),
      } as createUserViaRegisterInput);

    return await createUserViaRegisterRepository(payload as Omit<createUserViaOauth, "oauthProvider">);
  } catch (error) {
    ErrorForwarder(error);
  }
};
