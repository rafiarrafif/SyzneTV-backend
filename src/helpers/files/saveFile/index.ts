import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import mime from "mime-types";

interface SaveFileOptions {
  folder: string;
  prefix?: string;
}

export const saveFile = async (
  file: File,
  { folder, prefix }: SaveFileOptions
): Promise<string> => {
  const ext = mime.extension(file.type) || "bin";
  const uniqueName = `${prefix ?? ""}${crypto.randomUUID()}.${ext}`;

  const relativeFolder = path.join("uploads", folder);
  const relativePath = path.join(relativeFolder, uniqueName);
  const absolutePath = path.join(process.cwd(), relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return relativePath;
};
