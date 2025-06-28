import { saveFile } from "..";
import { AppError } from "../../../error/instances/app";

export const saveAvatar = async (file: File): Promise<string> => {
  // Validate that the uploaded file is a single file
  if (Array.isArray(file)) {
    throw new AppError(415, "Can't upload more than 1 file");
  }

  // Validate that the file type is one of the allowed types, currently only .jpg, .png, and .webp are allowed
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new AppError(
      415,
      "Unsupported Media Type. File must be in .jpg, .png, or .webp format"
    );
  }

  // Save the file using the saveFile helper function with specific folder and prefix
  return await saveFile(file, {
    folder: "avatar",
    prefix: "usr-",
  });
};
