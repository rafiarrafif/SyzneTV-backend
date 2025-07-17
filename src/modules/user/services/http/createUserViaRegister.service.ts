import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { hashPassword } from "../../../../helpers/security/password/hash";
import { createUserViaRegisterRepository } from "../../repositories/create/createUserViaRegister.repository";
import { createUserViaRegisterInput } from "../../user.types";

export const createUserViaRegisterService = async (
  payload: createUserViaRegisterInput
) => {
  try {
    const hashedPassword = await hashPassword(payload.password);

    return createUserViaRegisterRepository({
      ...payload,
      password: hashedPassword,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
