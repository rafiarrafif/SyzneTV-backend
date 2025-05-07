import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../helpers/security/password/hash";
import { userModel } from "../user.model";

export const createUserService = async (userData: Prisma.UserCreateInput) => {
  const { password, ...rest } = userData; // Destructure the password and the rest of the user data
  const hashedPassword = await hashPassword(password); // Hash the password before saving to the database

  // Create the user in the database using Prisma
  try {
    const newUser = await userModel.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};
