const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const middleware = require("../middleware");

const User = require("../models/user");

userRouter.post("/sign-up", async (req, res, next) => {
	try {
		const { email, username, passwordOne, passwordTwo } = req.body;

		if (passwordOne !== passwordTwo) {
			return res.status(400).json("passwords do not match");
		}

		const password = await bcrypt.hash(passwordOne, 10);

		const newUser = new User({
			email,
			username,
			password,
			created: new Date()
		});
		await newUser.save();

		const payload = {
			id: newUser._id,
			email: newUser.email,
			username: newUser.username,
			location: newUser.location,
			friends: newUser.friends,
			stack: newUser.stack
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET);

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

		const payload = {
			id: user._id,
			email: user.email,
			username: user.username,
			location: user.location,
			bio: user.bio,
			friends: user.friends,
			stack: user.stack
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

userRouter.get("/:id", middleware.verifyToken, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

userRouter.put("/", middleware.verifyToken, async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.userId, req.body, {
			new: true
		});

		const payload = {
			id: user._id,
			email: user.email,
			username: user.username,
			location: user.location,
			bio: user.bio,
			friends: user.friends,
			stack: user.stack
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;
