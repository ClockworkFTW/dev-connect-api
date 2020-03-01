var mongoose = require("mongoose");

var stackSchema = new mongoose.Schema({
	name: String,
	description: String,
	icon: String,
	link: String
});

var Stack = mongoose.model("Stack", stackSchema);

module.exports = Stack;
