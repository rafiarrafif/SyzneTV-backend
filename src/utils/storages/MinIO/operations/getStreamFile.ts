import { minioBucketName, minioClient } from "../client";
import { ensureBucketExists } from "../validations/ensureBucketExists";

export const getStreamFile = async (filename: string) => {
  await ensureBucketExists();

  return await minioClient.getObject(process.env.MINIO_BUCKET!, filename);
};
