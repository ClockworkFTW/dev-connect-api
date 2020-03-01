const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

userRouter.post("/sign-up", async (req, res, next) => {
	try {
		const { email, username, passwordOne, passwordTwo } = req.body;

		if (passwordOne !== passwordTwo) {
			return res.status(400).json("passwords do not match");
		}

		const password = await bcrypt.hash(passwordOne, 10);

		const user = new User({
			email,
			username,
			password,
			created: new Date()
		});
		await user.save();

		const token = jwt.sign({ username }, process.env.JWT_SECRET);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

userRouter.post("/sign-in", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		const match = user
			? await bcrypt.compare(password, user.password)
			: false;

		if (!match) {
			return res.status(400).json("incorrect email or password");
		}

		const token = jwt.sign({ username }, process.env.JWT_SECRET);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;
