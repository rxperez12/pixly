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

import { v4 as uuid } from "uuid"; //USE FOR KEY


const s3Client = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION
});

class Picture {

  /** TODO: Given image, upload file to S3 bucket */
  static async addImageToBucket(params) {
    console.log("addImageToBucket");
    await s3Client.send(
      new PutObjectCommand(params)
    );
  }

  /**TODO: Get all images from S3 bucket */
  static async getImagesFromBucket() {
    console.log("getImagesFromBucket");
    const totalObjects = [];

    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: BUCKET_NAME }
    );

    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        for (const object of objects) {
          totalObjects.push(object);
        }
      }

    }
    return totalObjects;
  }


}

export { Picture };