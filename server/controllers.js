const Utils = require("./util");
const GithubService = require("./Github.service");
const githubInstallationWebhook = async (req, res) => {
  console.log("Received webhook");
  const accessCode = req.query.code;
  const accessToken = await GithubService.getUserAccesToken(accessCode);
  res.status(200).send("OK");
};

const logWebhook = (respondWithinMiddleware = true) => {
  return async (req, res, next) => {
    console.log("Received webhook");
    const webhookData = {
        body: req.body,
        query: req.query
    }
    console.log(webhookData);
    Utils.writeJsonFile('webhook', webhookData);
    if (respondWithinMiddleware) {
      res.status(200).send("OK");
    } else {
      next();
    }
  };
};

const listGithubRepos = async (req, res) => {
  const accessToken = req.query.accessToken;
  const repos = await GithubService.getRepos(accessToken);
  Utils.sendResponse(res, 200, repos, true);
};

const listPullRequestByRepo = async (req, res) => {
  const { owner, repo, accessToken } = req.query;
  const prs = await GithubService.getPrsByRepo(owner, repo, accessToken);
  Utils.sendResponse(res, 200, prs, true);

};  
const mergePullRequest = async (req, res) => {
  const { owner, repo, pullNumber, accessToken } = req.query;
  const prs = await GithubService.mergePullRequest(owner, repo, Number(pullNumber), accessToken);
  Utils.sendResponse(res, 200, prs, true);
};
module.exports = {
  githubInstallationWebhook,
  logWebhook,
  listGithubRepos,
  listPullRequestByRepo,
  mergePullRequest
};
