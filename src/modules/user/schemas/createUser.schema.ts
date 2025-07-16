import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4) //Total all username character must over 4 character
    .regex(/^[a-zA-Z0-9_-]+$/), //Prohibiting the use of spaces and symbols other than - and _
  email: z.email(),
  password: z
    .string()
    .min(8) //Total all password chaacter must over 8 character
    .regex(/[A-Z]/) //Min has 1 uppercase letter
    .regex(/[a-z]/) //Min has 1 lowercase letter
    .regex(/[0-9]/) //Min has 1 number
    .regex(/[^A-Za-z0-9"]/), //Min has 1 symbol character
});
