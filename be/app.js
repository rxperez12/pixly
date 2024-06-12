import express from "express";
import multer from "multer";
import { NotFoundError } from "./expressError.js";
import { Picture } from "./models/picture.js";
import { BUCKET_NAME } from "./config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/** Sample route */
app.get("/", async function (req, res) {
  console.log('GET');
  const images = await Picture.getImagesFromBucket();
  res.send(images);
});

//NOTE: 'image' argument for middleware function must match name of input field on HTML form
/** Upload an image */
app.post("/add", upload.single('image'), async function (req, res) {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  req.file.buffer;

  const params = {
    Bucket: BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  Picture.addImageToBucket(params);
  res.send("image added!");
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