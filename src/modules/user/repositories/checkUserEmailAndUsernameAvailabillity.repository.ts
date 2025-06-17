import { userModel } from "../user.model";

export const checkUserEmailAndUsernameAvailabillityRepo = async (
  id: string,
  username: string,
  email: string
) => {
  try {
    const checkUsernameAndEmailAvailabillity = await userModel.findFirst({
      where: {
        OR: [
          { username: username ?? undefined },
          { email: email ?? undefined },
        ],
        NOT: {
          id: id,
        },
      },
    });
    return checkUsernameAndEmailAvailabillity;
  } catch (error) {
    throw error;
  }
};
