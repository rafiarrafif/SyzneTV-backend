import z from "zod";

export const createUserViaRegisterSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4, "username: must be 4 characters or longer.") //Total all username character must over 4 character
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "username: symbols other than - and _ are not allowed"
    ), //Prohibiting the use of spaces and symbols other than - and _
  email: z.email(),
  password: z
    .string()
    .min(8, "password: must be 8 characters or longer.") //Total all password chaacter must over 8 character
    .regex(/[A-Z]/, "password: have at least 1 uppercase letter") //Have at least 1 uppercase letter
    .regex(/[a-z]/, "password: have at least 1 lowercase letter") //Have at least 1 lowercase letter
    .regex(/[0-9]/, "password: have at least 1 number") //Have at least 1 number
    .regex(
      /[^A-Za-z0-9"]/,
      "password: has at least 1 symbol except quotation marks"
    ), //Have at least 1 symbol character
});
