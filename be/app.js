import express from "express";
import multer from "multer";
import cors from "cors";
import crypto from "crypto";
import { NotFoundError } from "./expressError.js";
import { Picture } from "./models/picture.js";
import { BUCKET_NAME } from "./config.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');


/** Get images */
app.get("/", async function (req, res) {
  console.log('GET');
  const images = await Picture.getImagesFromBucket();
  res.json({ images });
});

//NOTE: 'image' argument for middleware function must match name of input field on HTML form
/** Upload an image */
app.post("/add", upload.single('image'), async function (req, res) {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  const params = {
    Bucket: BUCKET_NAME,
    Key: randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  await Picture.addImageToBucket(params);
  res.send({ message: "image added!" });
});

/** Update existing image */
app.put("/update", upload.single('image'), async function (req, res) {
  console.log(req.body);
  console.log("req.file", req.file);

  const params = {
    Bucket: BUCKET_NAME,
    Key: req.body.key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  await Picture.addImageToBucket(params); //TODO: change name of add image?

  res.json({ message: 'Image edited' });
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