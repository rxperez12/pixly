import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  paginateListObjectsV2
} from "@aws-sdk/client-s3";

import {
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY
 } from "../config.js";


const s3Client = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION
});

class Picture {
  static async addImageToBucket() {
    console.log("addImageToBucket");
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "test key",
        Body: "test body",
        ContentType: "test type"
      })
    );
  }

  static async getImagesFromBucket() {
    console.log("getImagesFromBucket");
  }
}

Picture.addImageToBucket();