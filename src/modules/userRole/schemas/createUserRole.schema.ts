import Joi from "joi";

export const createUserRoleSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  primaryColor: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
  secondaryColor: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
  pictureImage: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .optional(),
  badgeImage: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .optional(),
  isSuperadmin: Joi.boolean().required(),
  canEditMedia: Joi.boolean().required(),
  canManageMedia: Joi.boolean().required(),
  canEditEpisodes: Joi.boolean().required(),
  canManageEpisodes: Joi.boolean().required(),
  canEditComment: Joi.boolean().required(),
  canManageComment: Joi.boolean().required(),
  canEditUser: Joi.boolean().required(),
  canManageUser: Joi.boolean().required(),
  canEditSystem: Joi.boolean().required(),
  canManageSystem: Joi.boolean().required(),
});
