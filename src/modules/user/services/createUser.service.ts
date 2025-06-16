import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../helpers/security/password/hash";
import { createUserRepo } from "../repositories/createUser.repository";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";

export const createUserService = async (userData: Prisma.UserCreateInput) => {
  try {
    const { password, ...rest } = userData; // Destructure the password and the rest of the user data
    const hashedPassword = await hashPassword(password); // Hash the password before saving to the database

    const newUser = await createUserRepo({
      ...rest,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    ErrorForwarder(error, 500, "Internal server error");
  }
};
