import { AppError } from "../../../../helpers/error/instances/app";
import { minioBucketName, minioClient } from "../client";

export const ensureBucketExists = async () => {
  const exists = await minioClient.bucketExists(minioBucketName);
  if (!exists) {
    throw new AppError(503, "MinIO bucket is not configured properly");
  }
};
