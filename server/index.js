const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const jwt = require("express-jwt");
global.privateKeyPath = __dirname + "/middlewares/PrivateKey.key";
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

//database
const syncDatabase = require("./connection/sync-resync");
const db = require("./models/index.model");
syncDatabase(false, db);

app.use(express.json());
app.use(cors());

app.use(
  morgan(
    ":method :url [:date[clf]] :status :res[content-length] - :response-time ms"
  )
);
app.use(
  jwt({
    secret: privateKey,
    algorithms: ["HS256"],
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({
    path: ["/api/auth/sign-in", "/api/auth/sign-up", /^\/api\/assessment\/get-by-id\/.*/, /^\/api\/assessment\/send-answer\/.*/,],
  })
);
app.use(require("./routes/index.route"))

app.listen(4000, () => console.log("App listen in port 4000"));
