import { minioBucketName, minioClient, minioProtocol } from "../client";
import { ensureBucketExists } from "../validations/ensureBucketExists";
import { Readable } from "stream";

export const uploadFile = async (
  file: File,
  options?: {
    fileDir?: string;
    fileName?: string;
  }
): Promise<string> => {
  // Ensure the target MinIO bucket exists before performing any upload
  await ensureBucketExists();

  // Convert the uploaded file into a readable stream using ArrayBuffer and Node.js Buffer for further processing
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  // Define the target file path using optional directory and filename; generate UUID if filename is not provided and preserve original file extension
  const fileDir = options?.fileDir ?? "";
  const fileName = options?.fileName ?? crypto.randomUUID();
  const fileExt = file.name.split(".").pop();
  const pathDir = `${fileDir}/${fileName}.${fileExt}`;

  // Upload the file stream to the specified MinIO bucket and path
  await minioClient.putObject(minioBucketName, pathDir, stream);
  return pathDir;
};
