const express = require("express");
const bodyParser = require("body-parser");
const controllers = require("./controllers");
const app = express();

const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

const githubRouter = express.Router();
githubRouter.post("/install", asyncHandler(controllers.logWebhook()));
githubRouter.get(
  "/callback",
  asyncHandler(controllers.githubInstallationWebhook)
);
githubRouter.get("/listRepos", asyncHandler(controllers.listGithubRepos));
githubRouter.get(
  "/listPullsByRepo",
  asyncHandler(controllers.listPullRequestByRepo)
);
githubRouter.post("/mergePull", asyncHandler(controllers.mergePullRequest));

app.use("/github", githubRouter);

module.exports = app;
