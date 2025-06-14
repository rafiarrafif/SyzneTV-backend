import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../helpers/security/password/hash";
import { createUserRepo } from "../repositories/createUser.repository";

export const createUserService = async (userData: Prisma.UserCreateInput) => {
  const { password, ...rest } = userData; // Destructure the password and the rest of the user data
  const hashedPassword = await hashPassword(password); // Hash the password before saving to the database

  try {
    const newUser = await createUserRepo({
      ...rest,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};
