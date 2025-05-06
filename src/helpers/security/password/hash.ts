import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return await bcrypt.hash(password, saltRounds);
};
