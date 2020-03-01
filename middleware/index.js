const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const emptyObj = obj =>
	Object.entries(obj).length === 0 && obj.constructor === Object
		? "none"
		: obj;

const logRequests = (req, res, next) => {
	const info = chalk.yellow.bold;
	console.log(info("----INCOMING-REQUEST----"));
	console.log(info("ROUTE:"), req.url);
	console.log(info("METHOD:"), req.method);
	console.log(info("PARAMETERS:"), emptyObj(req.params));
	console.log(info("BODY:"), emptyObj(req.body));
	console.log(info("------------------------"));
	next();
};

const verifyToken = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.status(400).json("token missing");
		}
		const token = authorization.slice(7);
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.id;
		next();
	} catch (error) {
		next(error);
	}
};

const handleErrors = (err, req, res, next) => {
	console.error(chalk.bold.red(err));
	res.status(500).json("something went wrong");
};

module.exports = { logRequests, verifyToken, handleErrors };
