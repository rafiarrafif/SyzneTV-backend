import { userModel } from "../../user.model";
import { createUserViaRegisterInput } from "../../user.types";

export const createUserViaRegisterRepository = async (
  payload: createUserViaRegisterInput
) => {
  return await userModel.create({
    data: payload,
  });
};
