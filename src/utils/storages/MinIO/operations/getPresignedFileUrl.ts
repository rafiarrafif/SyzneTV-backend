import { minioClient } from "../client";
import { ensureBucketExists } from "../validations/ensureBucketExists";

export const getPresignedFileUrl = async (
  filename: string,
  expiresInSeconds: number = 3200
) => {
  await ensureBucketExists();

  return await minioClient.presignedGetObject(
    process.env.MINIO_BUCKET!,
    filename,
    expiresInSeconds
  );
};
