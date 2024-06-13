import express from "express";
import multer from "multer";
import cors from "cors";
import crypto from "crypto";
import { NotFoundError } from "./expressError.js";
import { BucketHandler } from "./models/BucketHandler.js";
import { BUCKET_NAME } from "./config.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

//images/:key

/** Get images */
app.get("/images", async function (req, res) {
  console.log('GET');
  const images = await BucketHandler.getImagesFromBucket();
  res.json({ images });
});

//NOTE: 'image' argument for middleware function must match name of input field on HTML form
/** Upload an image */
app.post("/images", upload.single('image'), async function (req, res) {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  const params = {
    Bucket: BUCKET_NAME,
    Key: randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  try {
    await BucketHandler.addImageToBucket(params);
  } catch (err) {
    res.json({ message: `Image upload failed: ${err}` });
  }

  res.json({ message: "image added!" });
});

/** Update existing image */
app.put("/images/:key", upload.single('image'), async function (req, res) {
  console.log(req.body);
  console.log("req.file", req.file);

  const key = req.params.key;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  try {
    await BucketHandler.addImageToBucket(params);
  } catch (err) {
    res.json({ message: `Image update failed: ${err}` });
  }

  res.json({ message: 'Image edited' });
});

app.delete("/images/:key", async function (req, res) {

  const key = req.params.key;

  try {
    await BucketHandler.deleteImageFromBucket({ key });
  } catch (err) {
    res.json({ message: `Delete failed: ${err}` });
  }

  res.json({ message: `Delete successful` });
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;