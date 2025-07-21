import { Client } from "minio";

const useSSL = false;

export const minioClient = new Client({
  endPoint: process.env.MINIO_HOST!,
  port: parseInt(process.env.MINIO_PORT!),
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
  useSSL,
});

export const minioBucketName = process.env.MINIO_BUCKET!;
export const minioProtocol = useSSL ? "https" : "http";
