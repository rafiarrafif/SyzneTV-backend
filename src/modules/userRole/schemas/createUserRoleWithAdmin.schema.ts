import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const createUserRoleWithAdminSchema = z.object({
  name: z.string(),
  primaryColor: z
    .string()
    .regex(
      /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      "primaryColor: Invalid hex code"
    )
    .optional(),
  secondaryColor: z
    .string()
    .regex(
      /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      "secondaryColor: Invalid hex code"
    )
    .optional(),
  pictureImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "pictureImage: File reached the maximum limit"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "pictureImage: File format not supported"
    )
    .optional(),
  badgeImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "badgeImage: File reached the maximum limit"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "badgeImage: File format not supported"
    )
    .optional(),
  isSuperadmin: z.boolean(),
  canEditMedia: z.boolean(),
  canManageMedia: z.boolean(),
  canEditEpisodes: z.boolean(),
  canManageEpisodes: z.boolean(),
  canEditComment: z.boolean(),
  canManageComment: z.boolean(),
  canEditUser: z.boolean(),
  canManageUser: z.boolean(),
  canEditSystem: z.boolean(),
  canManageSystem: z.boolean(),
});
