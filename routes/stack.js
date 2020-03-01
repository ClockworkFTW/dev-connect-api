const express = require("express");
const stackRouter = express.Router();

const middleware = require("../middleware");
stackRouter.use(middleware.verifyToken);

const Stack = require("../models/stack");

stackRouter.get("/", async (req, res, next) => {
	try {
		const stacks = await Stack.find();
		res.status(200).json(stacks);
	} catch (error) {
		next(error);
	}
});

module.exports = stackRouter;
