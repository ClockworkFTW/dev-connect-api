const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const chalk = require("chalk");

const models = require("./models");
models.connectDb();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const middleware = require("./middleware");
app.use(middleware.logRequests);

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);
const projectRouter = require("./routes/project");
app.use("/api/project", projectRouter);
const stackRouter = require("./routes/stack");
app.use("/api/stack", stackRouter);

app.use(middleware.handleErrors);

app.listen(port, () =>
	console.log(chalk.blue(`Example app listening on port ${port}!`))
);
