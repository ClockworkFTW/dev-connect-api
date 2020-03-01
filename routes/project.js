const express = require("express");
const projectRouter = express.Router();

const middleware = require("../middleware");
projectRouter.use(middleware.verifyToken);

const Project = require("../models/project");

projectRouter.get("/", async (req, res, next) => {
	try {
		const projects = await Project.find().populate("manager");
		res.status(200).json(projects);
	} catch (error) {
		next(error);
	}
});

projectRouter.post("/", async (req, res, next) => {
	try {
		const newProject = new Project(req.body);
		newProject.manager = req.userId;
		await newProject.save();
		res.status(200).json(newProject);
	} catch (error) {
		next(error);
	}
});

module.exports = projectRouter;
