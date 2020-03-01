var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	name: String,
	description: String,
	categories: Array,
	stack: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stack" }],
	manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;
