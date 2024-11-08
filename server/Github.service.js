const Utils = require("./util");
const Constants = require("./constants");
const axios = require("axios");
const qs = require("qs");

const getUserAccesToken = async (code) => {
  try {
    const costants = Constants.getConstants();
    const params = {
      client_id: costants.GITHUB_CLIENT_ID,
      client_secret: costants.GITHUB_SECRET,
      code,
    };
    const queryString = qs.stringify(params);
    const apiCall = {
      url: `https://github.com/login/oauth/access_token?${queryString}`,
      headers: {
        accept: "application/json",
      },
    };
    const response = await axios(apiCall);
    Utils.writeJsonFile("userAccessToken", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
const createGithubApiHeaders = (accessToken) => {
  const constants = Constants.getConstants();
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": constants.GITHUB_API_VERSION,
  };
};
const getRepos = async (accessToken) => {
  try {
    const apiCall = {
      url: `https://api.github.com/user/repos`,
      headers: createGithubApiHeaders(accessToken),
      methods: "GET",
    };
    const response = await axios(apiCall);
    Utils.writeJsonFile("userRepos", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const getPrsByRepo = async (ownerName, repoName, accessToken) => {
  try {
    const apiCall = {
      url: `https://api.github.com/repos/${ownerName}/${repoName}/pulls`,
      headers: createGithubApiHeaders(accessToken),
      methods: "GET",
    };
    const response = await axios(apiCall);
    Utils.writeJsonFile("prsByRepo", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const mergePullRequest = async (ownerName, repoName, prNumber, accessToken) => {
  try {
    const apiCall = {
      url: `https://api.github.com/repos/${ownerName}/${repoName}/pulls/${prNumber}/merge`,
      headers: createGithubApiHeaders(accessToken),
      method: "PUT",
    };
    const response = await axios(apiCall);
    Utils.writeJsonFile("mergePrsByRepo", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
module.exports = {
  getUserAccesToken,
  getRepos,
  getPrsByRepo,
  mergePullRequest
};
