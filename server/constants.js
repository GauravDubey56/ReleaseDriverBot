const Util = require("./util");
Util.loadEnv();
const Env = Util.getEnv();

const getConstants = () => {
  const constants = {
    GITHUB_SECRET: Env.GITHUB_SECRET,
    GITHUB_CLIENT_ID: Env.GITHUB_CLIENT_ID,
    GITHUB_ID: Env.GITHUB_ID,
    PORT: Env.PORT,
    GITHUB_API_VERSION: Env.GITHUB_API_VERSION,
    GITHUB_API_URL: Env.GITHUB_API_URL,
  };
  return constants;
};

module.exports = {
  getConstants,
};
