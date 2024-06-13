import {
  S3Client,
  PutObjectCommand,
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

const BASE_BUCKET_URL = "https://pixly-r38.s3.us-east-2.amazonaws.com";

/** Model for Picture holds all functions for S3 integration */
class Picture {

  /** Given image, upload file to S3 bucket */
  static async addImageToBucket(params) {
    console.log("addImageToBucket");
    await s3Client.send(
      new PutObjectCommand(params)
    );
  }

  /** Get all images from S3 bucket */
  static async getImagesFromBucket() {
    console.log("getImagesFromBucket");
    const images = [];

    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: BUCKET_NAME }
    );

    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        for (const object of objects) {
          const url = `${BASE_BUCKET_URL}/${object.Key}`;
          images.push({ url, key: object.Key });
        }
      }
    }
    return images;
  }
}

export { Picture };