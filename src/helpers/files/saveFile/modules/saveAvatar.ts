import { saveFile } from "..";
import { AppError } from "../../../error/instances/app";

export const saveAvatar = async (file: File): Promise<string> => {
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new AppError(
      415,
      "Unsupported Media Type. File must be in .jpg, .png, or .webp format"
    );
  }

  return await saveFile(file, {
    folder: "avatar",
    prefix: "usr-",
  });
};
