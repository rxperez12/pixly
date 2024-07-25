/** Shared config for application; can be required many places. */

//CHANGE CONFIG TO MATCH DB FOR PIXLY
import dotenv from "dotenv";
import "colors";

dotenv.config();
const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;


const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "postgresql:///pixly_test"
    : process.env.DATABASE_URL || "postgresql:///pixly";
}


if (process.env.NODE_ENV !== "test") {
  console.log(`
${"Pixly Config:".green}
${"BUCKET_NAME:".yellow}        ${BUCKET_NAME}
${"BUCKET_REGION".yellow}       ${BUCKET_REGION}
${"ACCESS_KEY:".yellow}         ${ACCESS_KEY}
${"SECRET_ACCESS_KEY:".yellow}  ${SECRET_ACCESS_KEY}
${"Database:".yellow}           ${getDatabaseUri()}
---`);
}

export {
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
  getDatabaseUri,
  PORT
};
