const express = require("express");
const projectRouter = express.Router();

const middleware = require("../middleware");
projectRouter.use(middleware.verifyToken);

const Project = require("../models/project");

projectRouter.get("/", async (req, res, next) => {
	try {
		const projects = await Project.find();
		res.status(200).json(projects);
	} catch (error) {
		next(error);
	}
});

projectRouter.post("/", async (req, res, next) => {
	try {
		const project = new Project(req.body);
		project.user = req.userId;
		await project.save();
		res.status(200).json(project);
	} catch (error) {
		next(error);
	}
});

module.exports = projectRouter;
