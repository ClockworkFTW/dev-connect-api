const mongoose = require("mongoose");
const chalk = require("chalk");

const seedDb = require("./seed");

const connected = chalk.bold.cyan;
const err = chalk.bold.yellow;
const disconnected = chalk.bold.red;

const dbURL = process.env.DB_HOST;
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
};

const connectDb = () => {
	mongoose.connect(dbURL, dbOptions);

	// seedDb();

	mongoose.connection.on("connected", () =>
		console.log(
			connected(`Mongoose default connection is open to ${dbURL}`)
		)
	);

	mongoose.connection.on("error", error =>
		console.log(
			err(`Mongoose default connection has occured ${error} error`)
		)
	);

	mongoose.connection.on("disconnected", () =>
		console.log(disconnected("Mongoose default connection is disconnected"))
	);
};

module.exports = { connectDb };
