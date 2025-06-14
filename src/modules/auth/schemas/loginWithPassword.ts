import Joi from "joi";

export const loginWithPasswordSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});
