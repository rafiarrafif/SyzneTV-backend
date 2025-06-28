import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(255)
    .required(),
  username: Joi.string()
    .min(4)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .required(),
});
