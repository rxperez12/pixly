import express from "express";
import multer from "multer";
import { NotFoundError } from "./expressError.js";
import { add } from "./add.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


/** Sample route */
app.get("/", function (req, res) {

});

//NOTE: 'image' argument for middleware function must match name of input field on HTML form
/** Upload an image */
app.post("/add", upload.single('image'), async function (req, res) {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
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