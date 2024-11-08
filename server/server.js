const Utils = require("./util");
Utils.loadEnv();
const app = require("./app");
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
