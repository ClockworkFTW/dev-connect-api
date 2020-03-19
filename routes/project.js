const express = require("express");
const projectRouter = express.Router();

const middleware = require("../middleware");
projectRouter.use(middleware.verifyToken);

const Project = require("../models/project");

projectRouter.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate("manager")
      .populate("team")
      .populate("applicants");
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/", async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    newProject.manager = req.userId;
    newProject.created = new Date();
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("manager")
      .populate("team")
      .populate("applicants");
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = projectRouter;
