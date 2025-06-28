import { saveFile } from "..";
import { AppError } from "../../../error/instances/app";

export const saveCommentBackground = async (file: File): Promise<string> => {
  if (Array.isArray(file)) {
    throw new AppError(415, "Can't upload more than 1 file");
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new AppError(
      415,
      "Unsupported Media Type. File must be in .jpg, .png, or .webp format"
    );
  }

  return await saveFile(file, {
    folder: "comment-backgorund",
    prefix: "cmnt-bg-",
  });
};
