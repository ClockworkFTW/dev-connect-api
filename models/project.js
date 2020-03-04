var mongoose = require("mongoose");

var voteSchema = new mongoose.Schema({
	_id: false,
	up: Boolean,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

var projectSchema = new mongoose.Schema({
	name: String,
	description: String,
	difficulty: String,
	status: String,
	categories: Array,
	stack: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stack" }],
	manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	votes: [voteSchema],
	created: Date
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;
