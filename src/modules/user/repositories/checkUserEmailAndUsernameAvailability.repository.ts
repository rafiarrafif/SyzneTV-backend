import { Prisma } from "@prisma/client";
import { userModel } from "../user.model";

export const checkUserEmailAndUsernameAvailabillity = async (
  payload: Partial<Prisma.UserGetPayload<Record<string, never>>>
) => {
  try {
    const checkUsernameAndEmailAvailabillity = await userModel.findFirst({
      where: {
        OR: [
          { username: payload.username ?? undefined },
          { email: payload.email ?? undefined },
        ],
        NOT: {
          id: payload.id,
        },
      },
    });
    return checkUsernameAndEmailAvailabillity;
  } catch (error) {
    throw error;
  }
};
