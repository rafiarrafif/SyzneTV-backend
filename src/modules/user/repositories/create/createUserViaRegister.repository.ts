import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { userModel } from "../../user.model";
import { createUserViaRegisterInput } from "../../user.types";

export const createUserViaRegisterRepository = async (
  payload: createUserViaRegisterInput
) => {
  try {
    return await userModel.create({
      data: {
        ...payload,
        preference: {
          create: {},
        },
      },
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
