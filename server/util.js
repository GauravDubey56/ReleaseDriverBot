const dotenv = require("dotenv");
const fs = require("fs");
const writeJsonFile = (name, data) => {
  fs.writeFile(
    `tmp/${name}_${Date.now()}.json`,
    JSON.stringify(data, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
const sendResponse = (res, status, data, save) => {
  if (save) {
    writeJsonFile('response', data);
  }
  res.status(status).json(data);
};

const getEnv = () => {
  return process.env;
};

const loadEnv = () => {
  dotenv.config();
};
module.exports = {
  sendResponse,
  writeJsonFile,
  getEnv,
  loadEnv
};
