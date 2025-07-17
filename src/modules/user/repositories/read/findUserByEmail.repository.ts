import { userModel } from "../../user.model";
import { getUserDataOptions } from "../../user.types";

export const findUserByEmailRepository = async (
  email: string,
  options: getUserDataOptions
) => {
  return await userModel.findUnique({
    where: {
      email,
    },
    select: {
      id: options.verbosity?.includes("full"),
      name: ["full", "basic"].some((level) =>
        options.verbosity?.includes(level)
      ),
      username: ["full", "basic"].some((level) =>
        options.verbosity?.includes(level)
      ),
      email: options.verbosity?.includes("full"),
      password: options.verbosity?.includes("full"),
      birthDate: options.verbosity?.includes("full"),
      gender: options.verbosity?.includes("full"),
      phoneCC: options.verbosity?.includes("full"),
      phoneNumber: options.verbosity?.includes("full"),
      bioProfile: ["full", "basic"].some((level) =>
        options.verbosity?.includes(level)
      ),
      avatar: ["full", "basic"].some((level) =>
        options.verbosity?.includes(level)
      ),
      commentBackground: ["full", "basic"].some((level) =>
        options.verbosity?.includes(level)
      ),
      preferenceId: options.verbosity?.includes("full"),
      verifiedAt: options.verbosity?.includes("full"),
      disabledAt: options.verbosity?.includes("full"),
      createdAt: options.verbosity?.includes("full"),
      updatedAt: options.verbosity?.includes("full"),
    },
  });
};
