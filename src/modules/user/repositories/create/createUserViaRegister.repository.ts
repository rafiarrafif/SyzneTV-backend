import { generateUUIDv7 } from "../../../../helpers/databases/uuidv7";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { userModel } from "../../user.model";
import { createUserViaRegisterInput } from "../../user.types";

export const createUserViaRegisterRepository = async (
  payload: createUserViaRegisterInput,
) => {
  try {
    return await userModel.create({
      data: {
        ...payload,
        id: generateUUIDv7(),
        preference: {
          create: {
            id: generateUUIDv7(),
          },
        },
      },
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
