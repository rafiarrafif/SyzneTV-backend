import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required(),
  birthdate: Joi.date(),
  gender: Joi.string().valid("male", "female"),
  phoneCC: Joi.string().min(2).max(2),
  phoneNumber: Joi.string().min(7).max(15),
  bioProfile: Joi.string().max(300),
  avatar: Joi.string().uri(),
  commentBackground: Joi.string().uri(),
});
