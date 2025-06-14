import { getAllUserRepo } from "../repositories/getAllUser.repository";

export const getAllUsersService = async () => {
  try {
    const allUser = await getAllUserRepo();
    return allUser;
  } catch (error) {
    throw error;
  }
};
