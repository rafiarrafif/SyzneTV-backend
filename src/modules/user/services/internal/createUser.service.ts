import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { hashPassword } from "../../../../helpers/security/password/hash";
import { createUserViaRegisterRepository } from "../../repositories/create/createUserViaRegister.repository";
import {
  createUserViaOauth,
  createUserViaRegisterInput,
} from "../../user.types";

export const createUserService = async (
  payload: createUserViaRegisterInput | createUserViaOauth
) => {
  try {
    const hashedPassword = await hashPassword(payload.password);

    return await createUserViaRegisterRepository({
      ...payload,
      password: hashedPassword,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
