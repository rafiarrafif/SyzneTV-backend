import Joi from "joi";

export const editUserSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(255),
  username: Joi.string()
    .min(4)
    .max(255),
  birthdate: Joi.date(),
  gender: Joi.string().valid("male", "female"),
  phoneCC: Joi.string()
    .min(2)
    .max(2),
  phoneNumber: Joi.string()
    .min(7)
    .max(15),
  bioProfile: Joi.string().max(300),
  deletedAt: Joi.date(),

  // validate in helper
  avatar: Joi.any(),
  commentBackground: Joi.any(),
});
